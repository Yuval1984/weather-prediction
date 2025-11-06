import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayForecast } from './day-forecast';

describe('DayForecast', () => {
  let component: DayForecast;
  let fixture: ComponentFixture<DayForecast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayForecast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayForecast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
