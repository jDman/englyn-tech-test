import { Component } from '@angular/core';
import { DisplayEvents } from './components/display-events/display-events';
import { Connection } from './components/connection/connection';

@Component({
  selector: 'app-root',
  imports: [DisplayEvents, Connection],
  templateUrl: './app.html'
})
export class App {}
