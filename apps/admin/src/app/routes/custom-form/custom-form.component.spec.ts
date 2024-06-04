import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomFormComponent } from './custom-form.component';

describe('CustomFormComponent', () => {
  let component: CustomFormComponent;
  let fixture: ComponentFixture<CustomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
