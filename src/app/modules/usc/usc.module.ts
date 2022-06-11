import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UscRoutingModule } from './usc-routing.module';
import {UscComponent} from './components/usc.component'
import {FooterModule} from '../layout/footer/footer.module'
import {HeaderModule} from '../layout/header/header.module'



@NgModule({
  declarations: [
    UscComponent
  ],
  imports: [
    CommonModule,
    UscRoutingModule,
    FooterModule,
    HeaderModule
  ]
})
export class UscModule { }
