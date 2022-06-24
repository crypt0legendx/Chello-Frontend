import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { FooterModule} from '../layout/footer/footer.module';
import {HeaderNewModule} from '../layout/header-new/header-new.module';
import {SidebarModule} from '../layout/sidebar/sidebar.module';
import {SuggestionsModule} from '../layout/suggestions/suggestions.module';
import {PostFeedModule} from '../layout/post-feed/post-feed.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { SwiperModule } from 'swiper/angular';
import {StoryModule} from '../layout/story/story.module'
import {PostListModule} from '../layout/post-list/post-list.module'
import { PostOptionsModule } from '../layout/post-options/post-options.module';
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule,
    PostFeedModule,
    PostOptionsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SwiperModule,
    StoryModule,
    PostListModule
  ]
})
export class HomeModule { }
