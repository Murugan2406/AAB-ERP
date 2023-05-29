import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcraiseComponent } from './dcraise.component';

describe('DcraiseComponent', () => {
  let component: DcraiseComponent;
  let fixture: ComponentFixture<DcraiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcraiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcraiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
