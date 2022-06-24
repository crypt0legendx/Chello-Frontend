import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinEventRoutingModule } from './join-event-routing.module';
import { JoinEventComponent } from './components/join-event.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'
import { SuggestionsModule } from '../layout/suggestions/suggestions.module'

@NgModule({
  declarations: [
    JoinEventComponent
  ],
  imports: [
    CommonModule,
    JoinEventRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule
  ]
})
export class JoinEventModule { }
