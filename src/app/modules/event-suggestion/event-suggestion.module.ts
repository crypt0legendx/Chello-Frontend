import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventSuggestionComponent } from './components/event-suggestion.component';
import { EventSuggestionRoutingModule } from './event-suggestion-routing.module';



@NgModule({
  declarations: [
    EventSuggestionComponent
  ],
  imports: [
    CommonModule,
    EventSuggestionRoutingModule
  ],
  exports:[
    EventSuggestionComponent
  ]
})
export class EventSuggestionModule { }
