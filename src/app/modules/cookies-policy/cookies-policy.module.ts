import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookiesPolicyRoutingModule } from './cookies-policy-routing.module';
import { CookiesPolicyComponent } from './components/cookies-policy.component';

import {FooterModule} from '../layout/footer/footer.module'
import {HeaderModule} from '../layout/header/header.module'

@NgModule({
  declarations: [
    CookiesPolicyComponent
  ],
  imports: [
    CommonModule,
    CookiesPolicyRoutingModule,
    FooterModule,
HeaderModule
  ]
})
export class CookiesPolicyModule { }
