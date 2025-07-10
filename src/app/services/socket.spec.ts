import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket';
import { SocketSetupService } from './socket-setup';
import { of } from 'rxjs';
import { mockInplayIds } from '../test-utils/mockInplayIds';
import { mockExistingInplayEvent } from '../test-utils/mockExistingInplayEvent';

const mockInplayEvent = {
  id: 10,
  homeTeam: "Spurs",
  awayTeam: "Man City",
  homeScore: 2,
  awayScore: 2,
  marketId: 110,
};

describe('SocketService', () => {
  let service: SocketService;
  let socketSetupServiceSpy: jasmine.SpyObj<SocketSetupService>;
  const mockStompClient = {
    connect:() => { spyOnProperty(service, 'isConnected', 'get').and.returnValue(of(true))  },
    disconnect: () => { spyOnProperty(service, 'isConnected', 'get').and.returnValue(of(false))  },
    connected: true,
    subscribe: () => {},
    debug: jasmine.createSpy('debug')
  }

  beforeEach(() => {
    const setupSpy = jasmine.createSpyObj('SocketSetupService', ['getNewSockRoot', 'getStompClient']);

    TestBed.configureTestingModule(
      { providers: [SocketService, { provide: SocketSetupService, useValue: setupSpy }] }
    );
    service = TestBed.inject(SocketService);
    socketSetupServiceSpy = TestBed.inject(SocketSetupService) as jasmine.SpyObj<SocketSetupService>;

    socketSetupServiceSpy.getNewSockRoot.and.callFake(() => ({}));
    socketSetupServiceSpy.getStompClient.and.callFake(() => mockStompClient);

    spyOn(service, "getInplayIds").and.callFake(() => of(mockInplayIds));
    spyOn(service, "getInplayEvent").and.callFake(() => of(mockInplayEvent));
    spyOn(service, "getCompleteInplay").and.callFake(() => of(mockExistingInplayEvent));
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
        expect(isConnected).toBeTrue();
        done();
    });
  });

  it('should return isConnected as false when disconnected', (done: DoneFn) => {
    service.disconnectSocket();

    service.isConnected.subscribe(
      (isConnected) => {
        expect(isConnected).toBeFalse();
        done();
      });
  });

  it('should return an observable of ids from getInplayIds', (done: DoneFn) => {
    service.getInplayIds().subscribe((ids) => {
      expect(ids).toEqual(mockInplayIds);
      done();
    });
  });

  it('should return an observable of events from getInplayEvent', (done: DoneFn) => {
    service.getInplayEvent().subscribe((inplayEvent) => {
      expect(inplayEvent).toEqual(mockInplayEvent);
      done();
    });
  });

  it('should return an observable of complete events from getCompleteInplay', (done: DoneFn) => {
    service.getCompleteInplay().subscribe((completeEvent) => {
      expect(completeEvent).toEqual(mockExistingInplayEvent);
      done();
    });
  });

  it('should call stompClient subscribe to with id topic setInplayId', () => {
    service.connectSocket();
    spyOn(mockStompClient, 'subscribe').and.callThrough();
    
    service.setInplayId();

    expect(mockStompClient.subscribe).toHaveBeenCalled();
  });

  it('should call stompClient subscribe to with id topic setInplayEvent', () => {
    service.connectSocket();
    spyOn(mockStompClient, 'subscribe').and.callThrough();
    
    service.setInplayEvent(1);

    expect(mockStompClient.subscribe).toHaveBeenCalled();
  });

  it('should call stompClient subscribe to with id topic setInplayDisplay', () => {
    service.connectSocket();
    spyOn(mockStompClient, 'subscribe').and.callThrough();
    
    service.setInplayDisplay(110, mockInplayEvent);

    expect(mockStompClient.subscribe).toHaveBeenCalled();
  });

  it('should return true for isSocketConnected if stompclient exists and is connected', () => {
    service.connectSocket();

    expect(service.isSocketConnected()).toBeTruthy();
  });

  it('should return false for isSocketConnected if stompclient exists and is disconnected', () => {
    mockStompClient.connected = false;

    expect(service.isSocketConnected()).toBeFalsy();
  });
});
