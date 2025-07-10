import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';;

@Injectable({
  providedIn: 'root'
})
export class SocketSetupService {
  getNewSockRoot(url: string): any {
    return new SockJS(url);
  }

  getStompClient(socket: any): any {
    return Stomp.over(socket);
  }
}
