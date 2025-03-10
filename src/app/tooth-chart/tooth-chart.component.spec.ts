import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToothChartComponent } from './tooth-chart.component';

describe('ToothChartComponent', () => {
  let component: ToothChartComponent;
  let fixture: ComponentFixture<ToothChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToothChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToothChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
