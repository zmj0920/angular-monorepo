import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyValidationMessageComponent } from './formly-validation-message.component';

describe('FormlyValidationMessageComponent', () => {
  let component: FormlyValidationMessageComponent;
  let fixture: ComponentFixture<FormlyValidationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormlyValidationMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyValidationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
