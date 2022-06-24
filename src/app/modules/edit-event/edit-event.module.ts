import { EditEventRoutingModule } from './edit-event-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventSuggestionModule } from './../event-suggestion/event-suggestion.module';
import { SidebarModule } from './../layout/sidebar/sidebar.module';
import { FooterModule } from './../layout/footer/footer.module';
import { EditEventComponent } from './components/edit-event.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderNewModule } from '../layout/header-new/header-new.module';




@NgModule({
  declarations: [
    EditEventComponent
  ],
  imports: [
    CommonModule,
    EditEventRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    EventSuggestionModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers:[DatePipe]
})
export class EditEventModule { }
