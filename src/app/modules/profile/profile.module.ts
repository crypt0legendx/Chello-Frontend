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
import { PostOptionsModule } from '../layout/post-options/post-options.module';
import {StoryModule} from '../layout/story/story.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { ListTwoModule } from '../list-two/list-two.module';
import { ToastrModule } from 'ngx-toastr';
import { SwiperModule } from 'swiper/angular';

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
    PostOptionsModule,
    SwiperModule,
    FormsModule,
    ListTwoModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    StoryModule,
    PostListModule
  ]
})
export class ProfileModule { }
