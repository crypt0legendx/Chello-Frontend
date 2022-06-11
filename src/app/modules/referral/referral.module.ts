import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferralRoutingModule } from './referral-routing.module';
import { ReferralComponent } from './components/referral.component';
import {FooterModule} from '../layout/footer/footer.module'
import {HeaderModule} from '../layout/header/header.module'

@NgModule({
  declarations: [
    ReferralComponent
  ],
  imports: [
    CommonModule,
    ReferralRoutingModule,
    FooterModule,
    HeaderModule
  ]
})
export class ReferralModule { }
