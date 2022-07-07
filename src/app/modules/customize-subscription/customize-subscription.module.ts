import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomizeSubscriptionRoutingModule } from './customize-subscription-routing.module';
import { CustomizeSubscriptionComponent } from './components/customize-subscription.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'
import {SubMenuModule} from '../layout/sub-menu/sub-menu.module'

@NgModule({
  declarations: [
    CustomizeSubscriptionComponent
  ],
  imports: [
    CommonModule,
    CustomizeSubscriptionRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SubMenuModule
  ]
})
export class CustomizeSubscriptionModule { }
