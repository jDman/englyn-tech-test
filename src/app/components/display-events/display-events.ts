import { Component, inject, OnInit } from '@angular/core';
import { InplayDisplayEvent } from '../../interfaces/DisplayEvent';
import { DisplayEvent } from '../display-event/display-event';
import { SocketService } from '../../services/socket';
import { CommonModule } from '@angular/common';
import { combineLatest, Observable } from 'rxjs';
import { InplayId } from '../../interfaces/InplayId';

@Component({
  selector: 'app-display-events',
  imports: [CommonModule, DisplayEvent],
  templateUrl: './display-events.html'
})
export class DisplayEvents implements OnInit {
  private socketService: SocketService = inject(SocketService);
  private currentEvent$!: Observable<InplayDisplayEvent>;
  private currentIds$!: Observable<Array<InplayId>>;

  public currentEventsToDisplay: Array<InplayDisplayEvent> = [];

  ngOnInit() {
    this.currentEvent$ = this.socketService.getCompleteInplay();
    this.currentIds$ = this.socketService.getInplayIds();

    combineLatest([this.currentEvent$, this.currentIds$])
      .subscribe({
        next: this.updateCurrentEventList.bind(this)
      });
    this.socketService.isConnected.subscribe({
      next: (connected) => {
        if (!connected) {
          this.currentEventsToDisplay = [];
        }
      }
    })
  }

  private filterOutdatedIds(inplayIds: Array<InplayId>): Array<InplayDisplayEvent> {
    const filtered = [...this.currentEventsToDisplay.filter((currentEvent) => {
      return inplayIds.findIndex(({id}) => currentEvent.id === id) > -1;
    })];

    return filtered;
  }

  private updateCurrentEventList(
    [completeInplay, ids]: [InplayDisplayEvent, Array<InplayId>]): void {
      console.log('PRE FILTER: ', this.currentEventsToDisplay);
    let filteredCurrentEvents = this.filterOutdatedIds(ids);
    const newEventInCurrentEventsListIndex = filteredCurrentEvents
      .findIndex((currentEvent) => currentEvent.id === completeInplay.id);

    if (newEventInCurrentEventsListIndex === -1) {
      filteredCurrentEvents = [...filteredCurrentEvents, completeInplay];
      console.log('FILTER: ', filteredCurrentEvents);

    } else {
      filteredCurrentEvents[newEventInCurrentEventsListIndex] = completeInplay;
    }

    this.currentEventsToDisplay = filteredCurrentEvents;
  }
}
