import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCommonProductIssueComponent } from './section-common-product-issue.component';

describe('SectionCommonProductIssueComponent', () => {
  let component: SectionCommonProductIssueComponent;
  let fixture: ComponentFixture<SectionCommonProductIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionCommonProductIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCommonProductIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
