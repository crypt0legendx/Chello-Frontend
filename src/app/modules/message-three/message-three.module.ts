import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageThreeRoutingModule } from './message-three-routing.module';
import { MessageThreeComponent } from './components/message-three.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    MessageThreeComponent
  ],
  imports: [
    CommonModule,
    MessageThreeRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule
  ]
})
export class MessageThreeModule { }
