import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateEventFinalRoutingModule } from './private-event-final-routing.module';
import { PrivateEventFinalComponent } from './components/private-event-final.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'
import { SuggestionsModule } from '../layout/suggestions/suggestions.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    PrivateEventFinalComponent
  ],
  imports: [
    CommonModule,
    PrivateEventFinalRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class PrivateEventFinalModule { }
