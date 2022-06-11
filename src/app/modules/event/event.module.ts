import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './components/event.component';
import { FooterModule} from '../layout/footer/footer.module'
import {HeaderNewModule} from '../layout/header-new/header-new.module'
import {SidebarModule} from '../layout/sidebar/sidebar.module'
import {SuggestionsModule} from '../layout/suggestions/suggestions.module'
@NgModule({
  declarations: [
    EventComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    HeaderNewModule,
    FooterModule,
    SidebarModule,
    SuggestionsModule
  ]
})
export class EventModule { }
