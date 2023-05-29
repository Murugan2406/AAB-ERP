import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcinComponent } from './dcin.component';

describe('DcinComponent', () => {
  let component: DcinComponent;
  let fixture: ComponentFixture<DcinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
