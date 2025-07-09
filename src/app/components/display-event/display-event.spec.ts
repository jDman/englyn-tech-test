import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEvent } from './display-event';

describe('DisplayEvent', () => {
  let component: DisplayEvent;
  let fixture: ComponentFixture<DisplayEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
