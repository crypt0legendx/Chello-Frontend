import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookmarkRoutingModule } from './bookmark-routing.module';
import { BookmarkComponent } from './components/bookmark.component';
import { FooterModule} from '../layout/footer/footer.module'
import {HeaderNewModule} from '../layout/header-new/header-new.module'
import {SidebarModule} from '../layout/sidebar/sidebar.module'
import {PostListModule} from '../layout/post-list/post-list.module'
import { SuggestionsModule } from '../layout/suggestions/suggestions.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    BookmarkComponent
  ],
  imports: [
    CommonModule,
    BookmarkRoutingModule,
    HeaderNewModule,
    FooterModule,
    SidebarModule,
    PostListModule,
    SuggestionsModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class BookmarkModule { }
