import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGeneratedComponent } from './report-generated.component';

describe('ReportGeneratedComponent', () => {
  let component: ReportGeneratedComponent;
  let fixture: ComponentFixture<ReportGeneratedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGeneratedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
