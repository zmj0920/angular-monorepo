import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyWrapperFormFieldComponent } from './panel-wrapper.component';

describe('FormlyWrapperFormFieldComponent', () => {
  let component: FormlyWrapperFormFieldComponent;
  let fixture: ComponentFixture<FormlyWrapperFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormlyWrapperFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyWrapperFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
