import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './components/forgot-password.component';
import { FooterModule} from '../layout/footer/footer.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FooterModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class ForgotPasswordModule { }
