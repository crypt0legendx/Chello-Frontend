import { FormsModule } from '@angular/forms';
import { TipsRoutingModule } from './tips-routing.module';
import { SidebarModule } from './../layout/sidebar/sidebar.module';
import { HeaderNewModule } from './../layout/header-new/header-new.module';
import { FooterModule } from './../layout/footer/footer.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipsComponent } from './components/tips.component';
import {SubMenuModule} from '../layout/sub-menu/sub-menu.module'


@NgModule({
  declarations: [
    TipsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TipsRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SubMenuModule
  ]
})
export class TipsModule { }
