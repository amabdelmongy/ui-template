import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { TableComponent } from './table.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpRequestInterceptorMock} from './services/http-request-interceptor.mock';
import { mockCards } from './models/mock.card';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppConfigService } from './services/app-config.service';

describe('Table component', () => {
  let tableComponent: TableComponent;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        AppConfigService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRequestInterceptorMock,
          multi: true
        },
        {
          provide: ToastrService,
          useValue: jasmine.createSpyObj('ToastrService', ['info', 'error'])
        }
       ]
    }).compileComponents();

    mockToastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  }));

  beforeEach(() => {
    let fixture = TestBed.createComponent(TableComponent);
    tableComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', waitForAsync(() => {
    expect(tableComponent).toBeTruthy();
  }));

  it('should contain title', waitForAsync(() => {
    expect(tableComponent.title).toBe('Table');
  }));

  it('should contain items', waitForAsync(() => {
    expect(tableComponent.items).toEqual(mockCards);
    expect(mockToastrService.error).not.toHaveBeenCalled();
  }));
});