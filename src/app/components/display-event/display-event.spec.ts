import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEvent } from './display-event';
import { ComponentRef } from '@angular/core';

describe('DisplayEvent', () => {
  let component: DisplayEvent;
  let fixture: ComponentFixture<DisplayEvent>;
  let componentRef: ComponentRef<DisplayEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayEvent);
    componentRef = fixture.componentRef;
    component = fixture.componentInstance;
    componentRef.setInput('home', '11.50');
    componentRef.setInput('homeTeam', 'Liverpool');
    componentRef.setInput('homeScore', 3);
    componentRef.setInput('away', '16.77');
    componentRef.setInput('awayTeam', 'Brighton');
    componentRef.setInput('awayScore', 2);
    componentRef.setInput('draw', '5.55');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display homeTeam correctly', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector('.home-team')?.textContent?.trim()).toBe('Liverpool');
  });

  it('should display homeTeam correctly', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector('.home-team')?.textContent?.trim()).toBe('Liverpool');
  });

  it('should display awayTeam correctly', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector('.away-team')?.textContent?.trim()).toBe('Brighton');
  });

  it('should display homeScore correctly', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector('.home-score')?.textContent?.trim()).toBe('3');
  });

  it('should display awayScore correctly', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector('.away-score')?.textContent?.trim()).toBe('2');
  });

  it('should display home correctly', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector('.home')?.textContent?.trim()).toBe('11.50');
  });

  it('should display away correctly', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector('.away')?.textContent?.trim()).toBe('16.77');
  });

  it('should display draw correctly', () => {
    const fixtureElement = fixture.nativeElement as HTMLElement;
    expect(fixtureElement.querySelector('.draw')?.textContent?.trim()).toBe('5.55');
  });
});
