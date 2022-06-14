import { FormsModule } from '@angular/forms';
import { TipsRoutingModule } from './tips-routing.module';
import { SidebarModule } from './../layout/sidebar/sidebar.module';
import { HeaderNewModule } from './../layout/header-new/header-new.module';
import { FooterModule } from './../layout/footer/footer.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipsComponent } from './components/tips.component';



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
    SidebarModule
  ]
})
export class TipsModule { }
