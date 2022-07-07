import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyIdRoutingModule } from './verify-id-routing.module';
import { VerifyIdComponent } from './components/verify-id.component';
import { FooterModule } from '../layout/footer/footer.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    VerifyIdComponent
  ],
  imports: [
    CommonModule,
    VerifyIdRoutingModule,
    FooterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: []
})
export class VerifyIdModule { }
