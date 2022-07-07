import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyIdTwoRoutingModule } from './verify-id-two-routing.module';
import { VerifyIdTwoComponent } from './components/verify-id-two.component';
import { FooterModule } from '../layout/footer/footer.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    VerifyIdTwoComponent
  ],
  imports: [
    CommonModule,
    VerifyIdTwoRoutingModule,
    FooterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class VerifyIdTwoModule { }
