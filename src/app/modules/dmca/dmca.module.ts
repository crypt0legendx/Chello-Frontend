import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DmcaRoutingModule } from './dmca-routing.module';
import { DmcaComponent } from './components/dmca.component';
import {FooterModule} from '../layout/footer/footer.module'
import {HeaderModule} from '../layout/header/header.module'

@NgModule({
  declarations: [
    DmcaComponent
  ],
  imports: [
    CommonModule,
    DmcaRoutingModule,
    FooterModule,
    HeaderModule
  ]
})
export class DmcaModule { }
