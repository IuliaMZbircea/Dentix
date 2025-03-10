import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDocComponent } from './help-doc.component';

describe('HelpDocComponent', () => {
  let component: HelpDocComponent;
  let fixture: ComponentFixture<HelpDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
