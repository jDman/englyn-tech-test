import { Component } from '@angular/core';
import { InplayDisplayEvent } from '../../interfaces/DisplayEvent';
import { DisplayEvent } from '../display-event/display-event';

@Component({
  selector: 'app-display-events',
  imports: [DisplayEvent],
  templateUrl: './display-events.html',
  styleUrl: './display-events.css'
})
export class DisplayEvents {
  public displayEvents: Array<InplayDisplayEvent> = [
    {
      id: 10,
      homeTeam: "Spurs",
      awayTeam: "Man City",
      homeScore: 2,
      awayScore: 2,
      marketId: 110,
      home: "13.85", 
      draw: "8.30", 
      away: "9.55"
    },
    {
      id: 7,
      homeTeam: "Wolves",
      awayTeam: "Liverpool",
      homeScore: 6,
      awayScore: 3,
      marketId: 107,
      home: "9.60",
      draw: "16.00",
      away: "11.45"
    }
  ];
}
