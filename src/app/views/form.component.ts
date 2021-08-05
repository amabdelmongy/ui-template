import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'form.component.html'
})
export class FormComponent {
  title = 'Form';
  Cardform: FormGroup;
  ngOnInit(): void {
    this.Cardform = this.formBuilder.group({
      number: ['', [Validators.required, Validators.minLength(16),Validators.maxLength(16)]],
      expiry: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(3)]]
    });
  }

  constructor(
      private apiService: ApiService,
      public formBuilder: FormBuilder,
      private toastr: ToastrService
     ) {
  }

  Submit() {
    this.apiService.requestPayment(this.Cardform.getRawValue())
    .subscribe(data => {
      this.toastr.success('Saved data');
    },
    (error) => {
      this.toastr.error('Error in Save data', error.message);
    });
  }

  Rest() {
    if (this.Cardform) {
      this.Cardform.reset();
    }
  }
}
