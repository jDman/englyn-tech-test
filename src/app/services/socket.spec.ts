import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket';

describe('SocketService', () => {
  let service: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return isConnected as false', (done: DoneFn) => {
    service.isConnected.subscribe(
      (isConnected) => {
        expect(isConnected).toBeFalse();
        done();
      });
  });

  it('should return isConnected as true when connection made', (done: DoneFn) => {
    service.connectSocket();

    service.isConnected.subscribe(
      (isConnected) => {
        expect(isConnected).toBeFalse();
        done();
      });
  });
});
