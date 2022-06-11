import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsTwoRoutingModule } from './groups-two-routing.module';
import { GroupsTwoComponent } from './components/groups-two.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    GroupsTwoComponent
  ],
  imports: [
    CommonModule,
    GroupsTwoRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule
  ]
})
export class GroupsTwoModule { }
