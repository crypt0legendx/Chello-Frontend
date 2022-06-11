import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentConfirmationRoutingModule } from './payment-confirmation-routing.module';
import { PaymentConfirmationComponent } from './components/payment-confirmation.component';



@NgModule({
  declarations: [
    PaymentConfirmationComponent
  ],
  imports: [
    CommonModule,
    PaymentConfirmationRoutingModule,
  
  ]
})
export class PaymentConfirmationModule { }
