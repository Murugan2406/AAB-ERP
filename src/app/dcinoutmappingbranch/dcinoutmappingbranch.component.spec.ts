import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcinoutmappingbranchComponent } from './dcinoutmappingbranch.component';

describe('DcinoutmappingbranchComponent', () => {
  let component: DcinoutmappingbranchComponent;
  let fixture: ComponentFixture<DcinoutmappingbranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcinoutmappingbranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcinoutmappingbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
