import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeoBlockingTwoRoutingModule } from './geo-blocking-two-routing.module';
import { GeoBlockingTwoComponent } from './components/geo-blocking-two.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    GeoBlockingTwoComponent
  ],
  imports: [
    CommonModule,
    GeoBlockingTwoRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule
  ]
})
export class GeoBlockingTwoModule { }
