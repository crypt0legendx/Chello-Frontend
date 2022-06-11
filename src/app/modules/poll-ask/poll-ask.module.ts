import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PollAskRoutingModule } from './poll-ask-routing.module';
import { PollAskComponent } from './components/poll-ask.component';
import {FooterModule} from '../layout/footer/footer.module'
import {HeaderModule} from '../layout/header/header.module'


@NgModule({
  declarations: [
    PollAskComponent
  ],
  imports: [
    CommonModule,
    PollAskRoutingModule,
    FooterModule,
    HeaderModule
  ]
})
export class PollAskModule { }
