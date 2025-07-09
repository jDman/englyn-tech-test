import { Component, inject, OnInit } from '@angular/core';
import { SocketService } from './services/socket';
import { DisplayEvents } from './components/display-events/display-events';

@Component({
  selector: 'app-root',
  imports: [DisplayEvents],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  

  private socketService: SocketService = inject(SocketService)

  ngOnInit(): void {
    this.socketService.connectSocket();

    // this.socketService.getCompleteBookings().subscribe({
    //   next: (bookings) => {
    //     console.log(bookings);
    //   }
    // })
  }
}
