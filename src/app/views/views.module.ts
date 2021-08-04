
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormComponent } from './form.component';
import { TableComponent } from './table.component';
import { ViewsRoutingModule } from './views-routing.module';
import { ApiService } from './services/api.service';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ViewsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgProgressModule,
    NgProgressHttpModule
  ],
  declarations: [
    FormComponent,
    TableComponent
  ],
  providers: [
    ApiService,
    FormBuilder
  ]
})
export class ViewsModule { }
