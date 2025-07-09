import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEvents } from './display-events';

describe('DisplayEvents', () => {
  let component: DisplayEvents;
  let fixture: ComponentFixture<DisplayEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayEvents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
