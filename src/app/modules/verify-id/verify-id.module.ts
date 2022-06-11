import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyIdRoutingModule } from './verify-id-routing.module';
import { VerifyIdComponent } from './components/verify-id.component';
import { FooterModule } from '../layout/footer/footer.module'

@NgModule({
  declarations: [
    VerifyIdComponent
  ],
  imports: [
    CommonModule,
    VerifyIdRoutingModule,
    FooterModule
  ]
})
export class VerifyIdModule { }
