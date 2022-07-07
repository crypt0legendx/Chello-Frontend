import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
    ListTwoRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    FormsModule
  ]
})
export class ListTwoModule { }
