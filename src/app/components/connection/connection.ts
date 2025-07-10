import { Component, inject } from '@angular/core';
import { SocketService } from '../../services/socket';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connection',
  imports: [CommonModule],
  templateUrl: './connection.html',
  styleUrl: './connection.css'
})
export class Connection {
  private socketService: SocketService = inject(SocketService);

  connectToSocket(): void {
    this.socketService.connectSocket();
  }

  isConnected(): Observable<boolean> {
    return this.socketService.isConnected;
  }

  disconnectFromSocket(): void {
    this.socketService.disconnectSocket();
  }
}
