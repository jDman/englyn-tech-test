import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';;

@Injectable({
  providedIn: 'root'
})
export class SocketSetupService {
  private rootUrl: string = "http://ec2-13-40-74-60.eu-west-2.compute.amazonaws.com:8080/sportsbook";

  constructor() { }

  getNewSockRoot(): any {
    return new SockJS(this.rootUrl);
  }

  getStompClient(socket: any): any {
    return Stomp.over(socket);
  }
}
