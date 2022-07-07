import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './components/message.component';
import { FooterModule} from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { MessageTwoModule } from '../message-two/message-two.module';
@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MessageTwoModule
  ]
})
export class MessageModule { }
