import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsRoutingModule } from './terms-routing.module';
import { TermsComponent } from './components/terms.component';
import {FooterModule} from '../layout/footer/footer.module'
import {HeaderModule} from '../layout/header/header.module'

@NgModule({
  declarations: [
    TermsComponent
  ],
  imports: [
    CommonModule,
    TermsRoutingModule,
    FooterModule,
    HeaderModule
  ]
})
export class TermsModule { }
