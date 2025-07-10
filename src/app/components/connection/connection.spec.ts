import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Connection } from './connection';
import { SocketService } from '../../services/socket';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('Connection', () => {
  let component: Connection;
  let fixture: ComponentFixture<Connection>;
  let socketService: SocketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Connection],
      providers: [SocketService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Connection);
    socketService = TestBed.inject(SocketService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an enabled connect button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector<HTMLButtonElement>('.connect-btn')?.disabled).toBeFalse();
  });

  it('should display a disabled disconnect button', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector<HTMLButtonElement>('.disconnect-btn')?.disabled).toBeTrue();
  });

  it('should disable connect button once socket connection established', () => {
    spyOnProperty(socketService, "isConnected", "get").and.returnValue(of(true));
    fixture.detectChanges();

    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector<HTMLButtonElement>('.connect-btn')?.disabled).toBeTrue();
  });

  it('should enable disconnect button once socket connection disconnected', () => {
    spyOnProperty(socketService, "isConnected", "get").and.returnValue(of(true));
    fixture.detectChanges();

    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector<HTMLButtonElement>('.disconnect-btn')?.disabled).toBeFalse();
  });

  it('should call the socket service connectSocket method when connect button clicked', () => {
    spyOn(socketService, "connectSocket").and.callFake(() => {});
    const buttonDebug = fixture.debugElement.query(By.css('.connect-btn'));
    buttonDebug.triggerEventHandler('click');
    fixture.detectChanges();

    expect(socketService.connectSocket).toHaveBeenCalled();
  });

  it('should call the socket service disconnectSocket method when connect button clicked', () => {
    spyOnProperty(socketService, "isConnected", "get").and.returnValue(of(true));
    spyOn(socketService, "disconnectSocket").and.callFake(() => {});
    fixture.detectChanges();

    const buttonDebug = fixture.debugElement.query(By.css('.disconnect-btn'));
    buttonDebug.triggerEventHandler('click');
    fixture.detectChanges();

    expect(socketService.disconnectSocket).toHaveBeenCalled();
  })
});
