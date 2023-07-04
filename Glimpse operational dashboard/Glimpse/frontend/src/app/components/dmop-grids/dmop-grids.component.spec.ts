import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmopGridsComponent } from './dmop-grids.component';

describe('DmopGridsComponent', () => {
  let component: DmopGridsComponent;
  let fixture: ComponentFixture<DmopGridsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DmopGridsComponent]
    });
    fixture = TestBed.createComponent(DmopGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
