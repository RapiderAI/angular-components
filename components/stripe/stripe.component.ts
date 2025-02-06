import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { StripeFormField } from '@rapider/angular-components/core/stripe';
import { AlertType } from '@rapider/angular-components/core/alert';
import { HeadingType } from '@rapider/angular-components/core/heading';
import { CommonModule } from '@angular/common';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TranslateModule } from '@ngx-translate/core';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { RappiderNumberInputComponent } from '@rapider/angular-components/number-input';
// import { RappiderTagInputComponent } from '@rapider/angular-components/tag-input';
import { RappiderAlertComponent } from '@rapider/angular-components/alert';
import { RappiderTagInputComponent } from '../tag-input/tag-input.component'; // will be fix
import { NgxStripeModule } from 'ngx-stripe';

@Component({
  selector: 'rappider-stripe',
  templateUrl: './stripe.component.html',
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RappiderButtonComponent,
    NzFormModule,
    NzInputModule,
    NzSkeletonModule,
    TranslateModule,
    RappiderTextboxComponent,
    NzButtonComponent,
    RappiderIconComponent,
    RappiderNumberInputComponent,
    RappiderTagInputComponent,
    RappiderAlertComponent,
    NgxStripeModule
  ],
  standalone: true,
  styleUrls: ['./stripe.component.scss']
})
export class RappiderStripeComponent implements OnInit, OnChanges {
  @ViewChild(StripePaymentElementComponent) paymentElement: StripePaymentElementComponent;

  @Input() cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
  @Input() data: any;
  @Input() clientSecret: string;
  @Input() nameFieldVisibility: boolean;
  @Input() cityFieldVisibility: boolean;
  @Input() emailFieldVisibility: boolean;
  @Input() addressFieldVisibility: boolean;
  @Input() zipcodeFieldVisibility: boolean;
  @Input() promotionCodeFieldVisibility: boolean;
  @Input() allowMultiplePromotionCode: boolean;
  @Input() paymentIntentLoading: boolean;
  @Input() submitButton: ButtonComponentConfig;
  @Input() applyCodeButton: ButtonComponentConfig;
  @Input() infoAlertVisibility: boolean;

  @Output() paymentError = new EventEmitter<any>();
  @Output() paymentSuccess = new EventEmitter<any>();
  @Output() promotionCodeButtonClick = new EventEmitter<any>();
  @Output() payButtonClicked = new EventEmitter<void>();
  @Output() isVisibleChange = new EventEmitter<boolean>();

  isDarkTheme = document.body.className.includes('dark');
  appearance = {
    theme: this.isDarkTheme ? 'night' : 'stripe',
    variables: {
      boxShadow: 'none',
      spacingGridRow: '17px',
      spacingGridColumn: '10px',
      fontWeightNormal: '700',
      fontSizeSm: '14px',
      fontLineHeight: '19.5px',
      fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif'
    }
  };
  alertComponentConfig: any = {
    type: AlertType.Warning,
    showIcon: true,
    closeable: true,
    title: {
      content: 'If you do not have the client key, the Stripe component will not display properly',
      type: HeadingType.H6
    }
  };
  loading = false;
  paymentIntent: any;
  /* form group */
  paymentElementForm: FormGroup;
  promotionCodes: string[];

  constructor(
    private formBuilder: FormBuilder,
    private stripeService: StripeService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: any) {
    if (changes.data) {
      this.paymentElementForm?.patchValue(this.data);
    }
  }

  buildForm() {
    this.paymentElementForm = this.formBuilder.group({
      name: [this.data?.name],
      email: [this.data?.email, Validators.email],
      address: [this.data?.address],
      zipcode: [this.data?.zipcode],
      city: [this.data?.city],
      promotionCode: [this.data?.promotionCode]
    });
  }

  onPaymentFormSubmit() {
    this.paymentElementForm.updateValueAndValidity();
    if (this.paymentElementForm.valid) {
      this.payButtonClicked.emit();
      this.loading = true;
      this.stripeService?.confirmPayment({
        elements: this.paymentElement?.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.paymentElementForm?.get(StripeFormField.Name)?.value,
              email: this.paymentElementForm?.get(StripeFormField.Email)?.value,
              address: {
                line1: this.paymentElementForm?.get(StripeFormField.Address)?.value,
                postal_code: this.paymentElementForm?.get(StripeFormField.Zipcode)?.value,
                city: this.paymentElementForm?.get(StripeFormField.City)?.value,
              }
            }
          }
        },
        redirect: 'if_required'
      }).subscribe(result => {
        this.loading = false;
        if (result.error) {
          this.paymentError.emit(result);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            this.paymentSuccess.emit(result);
          }
        }
      });
    }
  }

  applyPromotionCode() {
    this.promotionCodeButtonClick.emit(this.promotionCodes);
  }
}
