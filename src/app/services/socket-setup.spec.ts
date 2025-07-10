import { TestBed } from '@angular/core/testing';

import { SocketSetupService } from './socket-setup';

describe('SocketSetupService', () => {
  let service: SocketSetupService;
  const url = 'http://someplace.com:8080/somwhere';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return new Sock js object getNewSockRoot', () => {
    const sockjs = service.getNewSockRoot(url);
    expect(sockjs.url).toEqual(url);
  });

  it('should return a stomp client', () => {
    const sockjs = service.getNewSockRoot(url);
    const stompClient = service.getStompClient(sockjs);
    expect (stompClient);
  })

});
