import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroupdownComponent } from './droupdown.component';

describe('DroupdownComponent', () => {
  let component: DroupdownComponent;
  let fixture: ComponentFixture<DroupdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroupdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DroupdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
