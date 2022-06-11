import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreRoutingModule } from './more-routing.module';
import { MoreComponent } from './components/more.component';
import { FooterModule} from '../layout/footer/footer.module'
import {HeaderNewModule} from '../layout/header-new/header-new.module'
import {SidebarModule} from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    MoreComponent
  ],
  imports: [
    CommonModule,
    MoreRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
  ]
})
export class MoreModule { }
