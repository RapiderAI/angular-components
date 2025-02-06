import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormService } from '@rapider/angular-components/core/services';
import { AddressFormData } from '@rapider/angular-components/core/address-form';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { ButtonType } from '@rapider/angular-components/core/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { RappiderTextareaComponent } from '@rapider/angular-components/textarea';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';

@Component({
  selector: 'rappider-address-form',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
    RappiderButtonComponent,
    RappiderTextboxComponent,
    RappiderTextareaComponent,
    TranslateModule
  ],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class RappiderAddressFormComponent implements OnChanges, OnInit {

  @Input() data: AddressFormData;
  @Input() submitButton: ButtonComponentConfig;

  @Output() formSubmit = new EventEmitter<AddressFormData>();

  addressForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private formService: FormService) { }

  ngOnInit(): void {
    this.buildForm();
    this.initDefaults();
  }

  ngOnChanges(): void {
    this.buildForm();
    this.initDefaults();
  }

  initDefaults() {
    if (this.submitButton == null) {
      this.submitButton = {
        text: 'SHARED.SUBMIT',
        type: ButtonType.Primary
      };
    }
  }

  buildForm() {
    this.addressForm = this.formBuilder.group({
      street: [this.data?.street, Validators.required],
      city: [this.data?.city, Validators.required],
      state: [this.data?.state, Validators.required],
      zip: [this.data?.zip, Validators.required],
      country: [this.data?.country, Validators.required],
    });
  }

  submitForm() {
    this.formService.checkFormValidation(this.addressForm);
    if (this.addressForm.valid) {
      this.formSubmit.emit(this.addressForm.value);
    }
  }

}
