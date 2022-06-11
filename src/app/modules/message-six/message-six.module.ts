import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageSixRoutingModule } from './message-six-routing.module';
import { MessageSixComponent } from './components/message-six.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    MessageSixComponent
  ],
  imports: [
    CommonModule,
    MessageSixRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule
  ]
})
export class MessageSixModule { }
