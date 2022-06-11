import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationSettingRoutingModule } from './notification-setting-routing.module';
import { NotificationSettingComponent } from './components/notification-setting.component';
import { FooterModule} from '../layout/footer/footer.module'
import {HeaderNewModule} from '../layout/header-new/header-new.module'
import {SidebarModule} from '../layout/sidebar/sidebar.module'
import {SuggestionsModule} from '../layout/suggestions/suggestions.module'
@NgModule({
  declarations: [
    NotificationSettingComponent
  ],
  imports: [
    CommonModule,
    NotificationSettingRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule
  ]
})
export class NotificationSettingModule { }
