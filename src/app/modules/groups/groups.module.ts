import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './components/groups.component';
import { FooterModule} from '../layout/footer/footer.module'
import {HeaderNewModule} from '../layout/header-new/header-new.module'
import {SidebarModule} from '../layout/sidebar/sidebar.module'
import {SuggestionsModule} from '../layout/suggestions/suggestions.module'
@NgModule({
  declarations: [
    GroupsComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule
  ]
})
export class GroupsModule { }
