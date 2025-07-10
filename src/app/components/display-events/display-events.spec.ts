import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEvents } from './display-events';
import { InplayDisplayEvent } from '../../interfaces/DisplayEvent';
import { SocketService } from '../../services/socket';
import { of } from 'rxjs';
import { DisplayEvent } from '../display-event/display-event';

const mockInplayIds = [{ id: 10 }, { id: 3 }, { id: 4 }];
const mockExistingInplayEvent: InplayDisplayEvent = {
  id: 10,
  homeTeam: "Spurs",
  awayTeam: "Man City",
  homeScore: 2,
  awayScore: 2,
  marketId: 110,
  home: "13.85",
  draw: "8.30",
  away: "9.55"
};
const mockNonExistingInplayEvent: InplayDisplayEvent = {
  id: 1,
  homeTeam: "Chelsea",
  awayTeam: "Fulham",
  homeScore: 1,
  awayScore: 1,
  marketId: 101,
  home: "9.38",
  draw: "11.10",
  away: "13.25"
};

describe('DisplayEvents', () => {
  let component: DisplayEvents;
  let fixture: ComponentFixture<DisplayEvents>;
  let socketService: SocketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayEvents, DisplayEvent],
      providers: [SocketService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayEvents);
    socketService = TestBed.inject(SocketService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should not display market headers initially without data', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector('.market-headers')).toBeNull();
  });

  it('it should not display full events initially without data', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector('.current-events')).toBeNull();
  });

  it('should create a current event list with correct if inplay id is found', () => {
    spyOn(socketService, 'getInplayIds').and.callFake(() => of(mockInplayIds));
    spyOn(socketService, 'getCompleteInplay').and.callFake(() => of(mockExistingInplayEvent));
    fixture.detectChanges();

    expect(component.currentEventsToDisplay).toEqual([]);
  });
});

describe('DisplayEvents: with existing event', () => {
  let component: DisplayEvents;
  let fixture: ComponentFixture<DisplayEvents>;
  let socketService: SocketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayEvents, DisplayEvent],
      providers: [SocketService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayEvents);
    socketService = TestBed.inject(SocketService);
    spyOnProperty(socketService, "isConnected", "get").and.returnValue(of(true));
    spyOn(socketService, "getInplayIds").and.returnValue(of(mockInplayIds));
    spyOn(socketService, "getCompleteInplay").and.returnValue(of(mockExistingInplayEvent));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('it should display market headers initially without data', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector(".market-headers")).toBeTruthy();
  });

  it('it should display full events initially without data', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector(".current-events")).toBeTruthy();
  });

  it('should create a current event list with correct if inplay id is found', () => {
    expect(component.currentEventsToDisplay).toEqual([mockExistingInplayEvent]);
  });
});

describe('DisplayEvents: with non existing event', () => {
  let component: DisplayEvents;
  let fixture: ComponentFixture<DisplayEvents>;
  let socketService: SocketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayEvents, DisplayEvent],
      providers: [SocketService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayEvents);
    socketService = TestBed.inject(SocketService);
    spyOnProperty(socketService, "isConnected", "get").and.returnValue(of(true));
    spyOn(socketService, "getInplayIds").and.returnValue(of(mockInplayIds));
    spyOn(socketService, "getCompleteInplay").and.returnValue(of(mockNonExistingInplayEvent));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should display market headers initially without data', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector(".market-headers")).toBeNull();
  });

  it('it should display full events initially without data', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector(".current-events")).toBeNull();
  });

  it('should create a current event list with correct if inplay id is found', () => {
    expect(component.currentEventsToDisplay).toEqual([]);
  });
});
