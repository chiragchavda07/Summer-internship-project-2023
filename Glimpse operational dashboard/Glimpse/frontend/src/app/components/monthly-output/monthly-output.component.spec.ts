import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyOutputComponent } from './monthly-output.component';

describe('MonthlyOutputComponent', () => {
  let component: MonthlyOutputComponent;
  let fixture: ComponentFixture<MonthlyOutputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyOutputComponent]
    });
    fixture = TestBed.createComponent(MonthlyOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
