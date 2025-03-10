import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeethMapComponent } from './teeth-map.component';

describe('TeethMapComponent', () => {
  let component: TeethMapComponent;
  let fixture: ComponentFixture<TeethMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeethMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeethMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
