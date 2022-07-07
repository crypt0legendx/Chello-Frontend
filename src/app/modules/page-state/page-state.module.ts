import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageStateRoutingModule } from './page-state-routing.module';
import { PageStateComponent } from './components/page-state.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'
import {SubMenuModule} from '../layout/sub-menu/sub-menu.module'
@NgModule({
  declarations: [
    PageStateComponent
  ],
  imports: [
    CommonModule,
    PageStateRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SubMenuModule
  ]
})
export class PageStateModule { }
