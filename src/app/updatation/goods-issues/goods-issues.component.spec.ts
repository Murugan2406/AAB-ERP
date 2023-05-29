import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsIssuesComponent } from './goods-issues.component';

describe('GoodsIssuesComponent', () => {
  let component: GoodsIssuesComponent;
  let fixture: ComponentFixture<GoodsIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
