import { Component, inject, OnInit } from '@angular/core';
import { InplayDisplayEvent } from '../../interfaces/DisplayEvent';
import { DisplayEvent } from '../display-event/display-event';
import { SocketService } from '../../services/socket';
import { CommonModule } from '@angular/common';
import { from, mergeMap, Observable, tap, toArray } from 'rxjs';

@Component({
  selector: 'app-display-events',
  imports: [CommonModule, DisplayEvent],
  templateUrl: './display-events.html',
  styleUrl: './display-events.css'
})
export class DisplayEvents implements OnInit {
  private socketService: SocketService = inject(SocketService);
  // public displayEvents: Array<InplayDisplayEvent> = [
  //   {
  //     id: 10,
  //     eventId: 10,
  //     homeTeam: "Spurs",
  //     awayTeam: "Man City",
  //     homeScore: 2,
  //     awayScore: 2,
  //     marketId: 110,
  //     home: "13.85", 
  //     draw: "8.30", 
  //     away: "9.55"
  //   },
  //   {
  //     id: 7,
  //     eventId: 7,
  //     homeTeam: "Wolves",
  //     awayTeam: "Liverpool",
  //     homeScore: 6,
  //     awayScore: 3,
  //     marketId: 107,
  //     home: "9.60",
  //     draw: "16.00",
  //     away: "11.45"
  //   }
  // ];
  public currentEventsToDisplay: Array<InplayDisplayEvent> = []
  public current$!: Observable<InplayDisplayEvent>;

  ngOnInit() {
    this.current$ = this.socketService.getCompleteInplay();
    this.socketService.getCompleteInplay().subscribe({
      next: (completeInplay) => {
        console.log(this.currentEventsToDisplay);
        // this.currentEventsToDisplay = this.currentEventsToDisplay.map(displayEvent => {
        //   return displayEvent.id === completeInplay.id ?
        //     {...displayEvent, completeInplay} : completeInplay;
        // }); 
        
        console.log(this.currentEventsToDisplay);
      }
    })
  }
}
