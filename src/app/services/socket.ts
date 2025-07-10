import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { InplayEvent } from '../interfaces/Event';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { InplayDisplayEvent } from '../interfaces/DisplayEvent';
import { InplayId } from '../interfaces/InplayId';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private stompClient: any;
  private rootUrl: string = "http://ec2-13-40-74-60.eu-west-2.compute.amazonaws.com:8080/sportsbook";
  private inplayIdSubject = new ReplaySubject<Array<{id: number}>>();
  private inplayEventSubject = new ReplaySubject<InplayEvent>();
  private inplayCompleteSubject = new ReplaySubject<InplayDisplayEvent>();
  private isConnectedSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.getInplayIds().subscribe({
      next: (inplayIds: Array<InplayId>) => {
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

  get isConnected(): Observable<boolean> {
    return this.isConnectedSubject.asObservable();
  }

  connectSocket(): void {
    const socket = new SockJS(this.rootUrl);
    const that = this;
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.inplayConnectionSetup.bind(that);
    });
  };

  private inplayConnectionSetup(): void {
    const that = this;
    this.isConnectedSubject.next(true);
    this.stompClient.subscribe('/topic/inplay', (liveEvents: any) => {
      that.inplayIdSubject.next(JSON.parse(liveEvents.body));
    });

    this.stompClient.debug = () => {};
  }

  disconnectSocket(): void {
    if (this.isSocketConnected()) {
      this.stompClient.disconnect();
      this.isConnectedSubject.next(false);
    }
  }

  getCompleteInplay(): Observable<InplayDisplayEvent> {
    return this.inplayCompleteSubject.asObservable();
  }

  getInplayEvent(): Observable<InplayEvent> {
    return this.inplayEventSubject.asObservable();
  }

  getInplayIds(): Observable<Array<InplayId>> {
    return this.inplayIdSubject.asObservable();
  }

  private isSocketConnected(): boolean {
    return this.stompClient && this.stompClient.connected;
  }

  private setInplayEvent(id: number) {
    if (this.isSocketConnected()) {
      this.stompClient.subscribe(`/topic/event/${id}`, (inplayEvent: any) => {
        this.inplayEventSubject.next(JSON.parse(inplayEvent.body));
      });
    }
  }

  private setInplayDisplay(marketId: number, inplayEvent: InplayEvent) {
    if (this.isSocketConnected()) {
      this.stompClient.subscribe(`/topic/market/${marketId}`, (market: any) => {
        this.inplayCompleteSubject.next({...JSON.parse(market.body), ...inplayEvent});
      })
    }
  }
}
