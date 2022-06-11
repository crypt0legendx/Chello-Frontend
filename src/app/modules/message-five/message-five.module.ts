import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageFiveRoutingModule } from './message-five-routing.module';
import { MessageFiveComponent } from './components/message-five.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'


@NgModule({
  declarations: [
    MessageFiveComponent
  ],
  imports: [
    CommonModule,
    MessageFiveRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule
  ]
})
export class MessageFiveModule { }
