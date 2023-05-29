import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreissueComponent } from './storeissue.component';

describe('StoreissueComponent', () => {
  let component: StoreissueComponent;
  let fixture: ComponentFixture<StoreissueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreissueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
