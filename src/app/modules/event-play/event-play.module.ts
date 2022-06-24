import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventPlayRoutingModule } from './event-play-routing.module';
import { EventPlayComponent } from './components/event-play.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'
import { SuggestionsModule } from '../layout/suggestions/suggestions.module'

@NgModule({
  declarations: [
    EventPlayComponent
  ],
  imports: [
    CommonModule,
    EventPlayRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule
  ]
})
export class EventPlayModule { }
