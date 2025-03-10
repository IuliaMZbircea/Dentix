import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePatientComponent } from './schedule-appointment.component';

describe('ScheduleAppointmentComponent', () => {
  let component: SchedulePatientComponent;
  let fixture: ComponentFixture<SchedulePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulePatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
