import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { PrivacyPolicyComponent } from './components/privacy-policy.component';
import {FooterModule} from '../layout/footer/footer.module'
import {HeaderModule} from '../layout/header/header.module'
@NgModule({
  declarations: [
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule,
    FooterModule,
    HeaderModule
  ]
})
export class PrivacyPolicyModule { }
