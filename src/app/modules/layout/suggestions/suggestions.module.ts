import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionsRoutingModule } from './suggestions-routing.module';
// import { ProfileModule } from '../../'
import { SuggestionsComponent } from './components/suggestions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    SuggestionsComponent
  ],
  imports: [
    CommonModule,
    SuggestionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [
    SuggestionsComponent
  ]
})
export class SuggestionsModule { }
