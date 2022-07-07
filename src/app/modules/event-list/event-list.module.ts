import { EventSuggestionModule } from './../event-suggestion/event-suggestion.module';
import { SuggestionsModule } from './../layout/suggestions/suggestions.module';
import { SidebarModule } from './../layout/sidebar/sidebar.module';
import { HeaderNewModule } from './../layout/header-new/header-new.module';
import { EventListRoutingModule } from './event-list-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './components/event-list.component';
import { FooterModule } from '../layout/footer/footer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    EventListComponent
  ],
  imports: [
    CommonModule,
    EventListRoutingModule,
    HeaderNewModule,
    FooterModule,
    SidebarModule,
    EventSuggestionModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EventListModule { }