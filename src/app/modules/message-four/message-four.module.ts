import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageFourRoutingModule } from './message-four-routing.module';
import { MessageFourComponent } from './components/message-four.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    MessageFourComponent
  ],
  imports: [
    CommonModule,
    MessageFourRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule
  ]
})
export class MessageFourModule { }
