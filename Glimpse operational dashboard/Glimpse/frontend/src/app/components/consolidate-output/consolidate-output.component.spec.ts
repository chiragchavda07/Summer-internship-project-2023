import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidateOutputComponent } from './consolidate-output.component';

describe('ConsolidateOutputComponent', () => {
  let component: ConsolidateOutputComponent;
  let fixture: ComponentFixture<ConsolidateOutputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsolidateOutputComponent]
    });
    fixture = TestBed.createComponent(ConsolidateOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
