import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeoBlockingRoutingModule } from './geo-blocking-routing.module';
import { GeoBlockingComponent } from './components/geo-blocking.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    GeoBlockingComponent
  ],
  imports: [
    CommonModule,
    GeoBlockingRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule
  ]
})
export class GeoBlockingModule { }
