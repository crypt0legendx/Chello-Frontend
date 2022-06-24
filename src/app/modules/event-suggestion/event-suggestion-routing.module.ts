import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventSuggestionComponent } from './components/event-suggestion.component';

const routes: Routes = [
  {
    path: '',
    component: EventSuggestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventSuggestionRoutingModule { }
