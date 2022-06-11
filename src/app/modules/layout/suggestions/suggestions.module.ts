import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './components/suggestions.component';


@NgModule({
  declarations: [
    SuggestionsComponent
  ],
  imports: [
    CommonModule,
    SuggestionsRoutingModule
  ],
  exports: [
    SuggestionsComponent
  ]
})
export class SuggestionsModule { }
