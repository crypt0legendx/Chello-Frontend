import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupNewRoutingModule } from './group-new-routing.module';
import { GroupNewComponent } from './components/group-new.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'
import { SuggestionsModule } from '../layout/suggestions/suggestions.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    GroupNewComponent
  ],
  imports: [
    CommonModule,
    GroupNewRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule,
  ]
})
export class GroupNewModule { }
