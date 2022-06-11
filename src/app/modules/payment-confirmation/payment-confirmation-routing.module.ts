import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentConfirmationComponent } from './components/payment-confirmation.component';
const routes: Routes = [
  {
    path: '',
    component: PaymentConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentConfirmationRoutingModule { }
