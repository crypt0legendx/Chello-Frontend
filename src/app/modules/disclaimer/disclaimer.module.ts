import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisclaimerRoutingModule } from './disclaimer-routing.module';
import { DisclaimerComponent } from './components/disclaimer.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderModule } from '../layout/header/header.module'



@NgModule({
  declarations: [
    DisclaimerComponent
  ],
  imports: [
    CommonModule,
    DisclaimerRoutingModule,
    FooterModule,
    HeaderModule
  ]
})
export class DisclaimerModule { }
