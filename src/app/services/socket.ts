import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, from, mergeMap, Observable, ReplaySubject, toArray } from 'rxjs';
import { InplayMarket } from '../interfaces/Market';
import { InplayEvent } from '../interfaces/Event';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { InplayDisplayEvent } from '../interfaces/DisplayEvent';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private stompClient: any;
  private rootUrl: string = "http://ec2-13-40-74-60.eu-west-2.compute.amazonaws.com:8080/sportsbook";
  private inplayIdSubject = new ReplaySubject<Array<{id: number}>>();
  private inplayEventSubject = new ReplaySubject<InplayEvent>();
  private inplayCompleteSubject = new ReplaySubject<InplayDisplayEvent>();

  constructor() {
    this.getInplayIds().subscribe({
      next: (inplayIds) => {
        inplayIds.forEach((inplayId) => {
          this.setInplayEvent(inplayId.id);
        })
      }
    })

    this.getInplayEvent().subscribe({
      next: (event) => {
        this.setInplayDisplay(event.marketId, event);
      }
    })
  }

  connectSocket(): void {
    const socket = new SockJS(this.rootUrl);
    const that = this;
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/inplay', function (liveEvents: any) {
        that.inplayIdSubject.next(JSON.parse(liveEvents.body));
      });

      this.stompClient.debug = () => {};
    });
  };

  isSocketConnected(): boolean {
    return this.stompClient && this.stompClient.connected;
  }

 
  disconnectSocket(): void {
    if (this.isSocketConnected()) {
      this.stompClient.disconnect();
    }
  }

  setInplayEvent(id: number) {
    if (this.isSocketConnected()) {
      this.stompClient.subscribe(`/topic/event/${id}`, (inplayEvent: any) => {
        this.inplayEventSubject.next(JSON.parse(inplayEvent.body));
      });
    }
  }

  setInplayDisplay(marketId: number, inplayEvent: InplayEvent) {
    if (this.isSocketConnected()) {
      this.stompClient.subscribe(`/topic/market/${marketId}`, (market: any) => {
        
        this.inplayCompleteSubject.next({...JSON.parse(market.body), ...inplayEvent});
      })
    }
  }

  getInplayIds(): Observable<Array<{ id: number }>> {
    return this.inplayIdSubject.asObservable();
  }

  getInplayEvent(): Observable<InplayEvent> {
    return this.inplayEventSubject.asObservable();
  }

  getCompleteInplay(): Observable<InplayDisplayEvent> {
    return this.inplayCompleteSubject.asObservable();
  }
}
