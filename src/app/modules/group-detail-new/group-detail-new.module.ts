import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupDetailNewRoutingModule } from './group-detail-new-routing.module';
import { GroupDetailNewComponent } from './components/group-detail-new.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module'
import { SuggestionsModule } from '../layout/suggestions/suggestions.module'
import {PostListModule} from '../layout/post-list/post-list.module'
import {GroupPostListModule} from '../layout/group-post-list/group-post-list.module'
import {PostFeedModule} from '../layout/post-feed/post-feed.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    GroupDetailNewComponent
  ],
  imports: [
    CommonModule,
    GroupDetailNewRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule,
    PostListModule,
    GroupPostListModule,
    PostFeedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule,
  ]
})
export class GroupDetailNewModule { }
