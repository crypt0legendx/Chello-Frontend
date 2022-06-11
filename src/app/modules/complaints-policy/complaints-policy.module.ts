import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintsPolicyRoutingModule } from './complaints-policy-routing.module';
import { ComplaintsPolicyComponent } from './components/complaints-policy.component';
import {FooterModule} from '../layout/footer/footer.module'
import {HeaderModule} from '../layout/header/header.module'

@NgModule({
  declarations: [
    ComplaintsPolicyComponent
  ],
  imports: [
    CommonModule,
    ComplaintsPolicyRoutingModule,
    FooterModule,
HeaderModule
  ]
})
export class ComplaintsPolicyModule { }
