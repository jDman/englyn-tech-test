import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { InplayEvent } from '../interfaces/Event';
import { InplayDisplayEvent } from '../interfaces/DisplayEvent';
import { InplayId } from '../interfaces/InplayId';
import { SocketSetupService } from './socket-setup';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private rootUrl: string = "http://ec2-13-40-74-60.eu-west-2.compute.amazonaws.com:8080/sportsbook";
  private socketSetupSerivce = inject(SocketSetupService);
  private stompClient: any;
  private inplayIdSubject = new ReplaySubject<Array<{id: number}>>();
  private inplayEventSubject = new ReplaySubject<InplayEvent>();
  private inplayCompleteSubject = new ReplaySubject<InplayDisplayEvent>();
  private isConnectedSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.getInplayIds().subscribe({
      next: (inplayIds: Array<InplayId>) => {
        inplayIds.forEach((inplayId) => {
          if (this.isSocketConnected()) {
            this.setInplayEvent(inplayId.id);
          }
        })
      }
    })

    this.getInplayEvent().subscribe({
      next: (event) => {
        if (this.isSocketConnected()) {
          this.setInplayDisplay(event.marketId, event);
        }
      }
    })
  }

  get isConnected(): Observable<boolean> {
    return this.isConnectedSubject.asObservable();
  }

  connectSocket(): void {
    const socket = this.socketSetupSerivce.getNewSockRoot(this.rootUrl);
    this.stompClient = this.socketSetupSerivce.getStompClient(socket);
    this.stompClient.connect({}, () => {
      this.isConnectedSubject.next(true);

      if (this.isSocketConnected()) {
        this.setInplayId();
      }
    });
  };

  disconnectSocket(): void {
    if (this.isSocketConnected()) {
      this.isConnectedSubject.next(false);
      this.stompClient.disconnect();
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

  setInplayId(): void {
    this.stompClient.subscribe('/topic/inplay', (liveEvents: any) => {
      this.inplayIdSubject.next(JSON.parse(liveEvents.body));
    });
  }

  setInplayEvent(id: number): void {
    this.stompClient.subscribe(`/topic/event/${id}`, (inplayEvent: any) => {
      this.inplayEventSubject.next(JSON.parse(inplayEvent.body));
    });
  }

  setInplayDisplay(marketId: number, inplayEvent: InplayEvent): void {
    this.stompClient.subscribe(`/topic/market/${marketId}`, (market: any) => {
      this.inplayCompleteSubject.next({...JSON.parse(market.body), ...inplayEvent});
    });
  }

  isSocketConnected(): boolean {
    return this.stompClient && this.stompClient.connected;
  }
}
