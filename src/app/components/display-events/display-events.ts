import { Component, inject, OnInit } from '@angular/core';
import { InplayDisplayEvent } from '../../interfaces/DisplayEvent';
import { DisplayEvent } from '../display-event/display-event';
import { SocketService } from '../../services/socket';
import { CommonModule } from '@angular/common';
import { combineLatest, Observable, of } from 'rxjs';
import { InplayId } from '../../interfaces/InplayId';
import { updateCurrentEventList } from './helpers/updateCurrentEventList';

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
        next: this.updateCurrentEvents.bind(this)
      });
    this.socketService.isConnected.subscribe({
      next: (connected) => {
        if (!connected) {
          this.currentEventsToDisplay = [];
        }
      }
    })
  }

  private updateCurrentEvents([completeInplay, ids]: [InplayDisplayEvent, Array<InplayId>]) : void {
    this.currentEventsToDisplay = updateCurrentEventList([completeInplay, ids], this.currentEventsToDisplay);
  }
}
