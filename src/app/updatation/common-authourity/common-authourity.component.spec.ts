import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAuthourityComponent } from './common-authourity.component';

describe('CommonAuthourityComponent', () => {
  let component: CommonAuthourityComponent;
  let fixture: ComponentFixture<CommonAuthourityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonAuthourityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonAuthourityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
