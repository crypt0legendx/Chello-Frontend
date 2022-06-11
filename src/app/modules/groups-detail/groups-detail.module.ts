import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsDetailRoutingModule } from './groups-detail-routing.module';
import { GroupsDetailComponent } from './components/groups-detail.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'
import {SuggestionsModule} from '../layout/suggestions/suggestions.module'
@NgModule({
  declarations: [
    GroupsDetailComponent
  ],
  imports: [
    CommonModule,
    GroupsDetailRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule
  ]
})
export class GroupsDetailModule { }
