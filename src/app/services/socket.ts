import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, from, mergeMap, Observable, toArray } from 'rxjs';
import { InplayMarket } from '../interfaces/Market';
import { InplayEvent } from '../interfaces/Event';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private http: HttpClient) {}

  getInplayIds(): Observable<Array<{ id: number }>> {
    return this.http
      .get<Array<{ id: number }>>('http://localhost:3000/inplay');
  }

  getEvent(id: number): Observable<InplayEvent> {
    return this.http.get<any>(`http://localhost:3000/event/${id}`);
  }
  
  getMarket(id: number): Observable<InplayMarket> {
    return this.http.get<any>(`http://localhost:3000/market/${id}`);
  }

  // getCompleteBookings(): Observable<Array<any>> {
  //   const inputEvent$ = this.getInplayIds().pipe(
  //     mergeMap(inplay => from(inplay)),
  //     mergeMap(inplayId => this.getEvent(inplayId.id))
  //   );
  //   const inputMarket$ = inputEvent$.pipe(
  //     toArray(),
  //     mergeMap(event => from(event)),
  //     mergeMap(inplayEvent => this.getMarket(inplayEvent.marketId)),
  //   );

  //   return inputEvent$.map(event => )
    
    
  //   , inputMarket$).pipe(toArray());
  // }
}
