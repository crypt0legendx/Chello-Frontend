import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile.component';
import { FooterModule} from '../layout/footer/footer.module';
import {HeaderNewModule} from '../layout/header-new/header-new.module';
import {SidebarModule} from '../layout/sidebar/sidebar.module';
import {SuggestionsModule} from '../layout/suggestions/suggestions.module';
import {PostFeedModule} from '../layout/post-feed/post-feed.module';
import {PostListModule} from '../layout/post-list/post-list.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule,
    PostFeedModule,
    PostListModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class ProfileModule { }
