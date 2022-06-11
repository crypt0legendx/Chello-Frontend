import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateGroupRoutingModule } from './create-group-routing.module';
import { CreateGroupComponent } from './components/create-group.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'
import { SuggestionsModule } from '../layout/suggestions/suggestions.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    CreateGroupComponent
  ],
  imports: [
    CommonModule,
    CreateGroupRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class CreateGroupModule { }
