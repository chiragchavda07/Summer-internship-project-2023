import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyClientComponent } from './daily-client.component';

describe('DailyClientComponent', () => {
  let component: DailyClientComponent;
  let fixture: ComponentFixture<DailyClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyClientComponent]
    });
    fixture = TestBed.createComponent(DailyClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
