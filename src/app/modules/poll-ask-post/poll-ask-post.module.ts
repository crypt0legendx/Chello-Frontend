import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PollAskPostRoutingModule } from './poll-ask-post-routing.module';
import { PollAskPostComponent } from './components/poll-ask-post.component';
import {FooterModule} from '../layout/footer/footer.module'
import {HeaderModule} from '../layout/header/header.module'

@NgModule({
  declarations: [
    PollAskPostComponent
  ],
  imports: [
    CommonModule,
    PollAskPostRoutingModule,
    FooterModule,
    HeaderModule
  ]
})
export class PollAskPostModule { }
