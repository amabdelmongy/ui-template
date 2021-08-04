import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { FormComponent } from './form.Component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpRequestInterceptorMock}from './services/http-request-interceptor.mock';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('Form formComponent', () => {
  let formComponent: FormComponent;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRequestInterceptorMock,
          multi: true
        },
        {
          provide: ToastrService,
          useValue: jasmine.createSpyObj('ToastrService', ['success', 'error'])
        }
       ]
    }).compileComponents();

    mockToastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  }));

  beforeEach(() => {
    let fixture = TestBed.createComponent(FormComponent);
    formComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', waitForAsync(() => {
    expect(formComponent).toBeTruthy();
  }));

  it('should contain title', waitForAsync(() => {
    expect(formComponent.title).toBe("Form");
  }));

  it('should invalid form when empty', () => {
    expect(formComponent.Cardform.valid).toBeFalsy();
  });

  it('should invalid form', () => {
    expect(formComponent.Cardform.valid).toBeFalsy();
    formComponent.Cardform.controls['number'].setValue("1324567890123456");
    formComponent.Cardform.controls['expiry'].setValue("12/25");
    formComponent.Cardform.controls['cvv'].setValue("123");
    expect(formComponent.Cardform.valid).toBeTruthy();
  });

  it('should number field required', () => {
    let number = formComponent.Cardform.controls['number'];
    let errors = number.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should number field minLength', () => {
    let number = formComponent.Cardform.controls['number'];
    number.setValue("123")
    let errors = number.errors || {};
    expect(errors.minlength).toBeTruthy();
  });

  it('should number field maxLength', () => {
    let number = formComponent.Cardform.controls['number'];
    number.setValue("123465789013246567")
    let errors = number.errors || {};
    expect(errors.maxlength).toBeTruthy();
  });

  it('submitting a form return success', () => {
    formComponent.Cardform.controls['number'].setValue("1324567890123456");
    formComponent.Cardform.controls['expiry'].setValue("12/25");
    formComponent.Cardform.controls['cvv'].setValue("123");
    formComponent.Submit();

    expect(mockToastrService.success).toHaveBeenCalled();
    expect(mockToastrService.error).not.toHaveBeenCalled();
  });
});