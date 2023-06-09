import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyticketsComponent } from './mytickets.component';

describe('MyticketsComponent', () => {
  let component: MyticketsComponent;
  let fixture: ComponentFixture<MyticketsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyticketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
