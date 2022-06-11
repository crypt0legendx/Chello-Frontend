import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageTwoRoutingModule } from './message-two-routing.module';
import { MessageTwoComponent } from './components/message-two.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    MessageTwoComponent
  ],
  imports: [
    CommonModule,
    MessageTwoRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule
  ]
})
export class MessageTwoModule { }
