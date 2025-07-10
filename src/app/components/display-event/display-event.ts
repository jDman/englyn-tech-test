import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-display-event',
  imports: [],
  templateUrl: './display-event.html',
  styleUrl: './display-event.css'
})
export class DisplayEvent {
  public home: InputSignal<string> = input('');
  public homeTeam: InputSignal<string> = input('');
  public homeScore: InputSignal<number> = input(0);
  public away: InputSignal<string> = input('');
  public awayTeam: InputSignal<string> = input('');
  public awayScore: InputSignal<number> = input(0);
  public draw: InputSignal<string> = input('');
}
