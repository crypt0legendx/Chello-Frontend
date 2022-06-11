import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListTwoRoutingModule } from './list-two-routing.module';
import { ListTwoComponent } from './components/list-two.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    ListTwoComponent
  ],
  imports: [
    CommonModule,
    ListTwoRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule
  ]
})
export class ListTwoModule { }
