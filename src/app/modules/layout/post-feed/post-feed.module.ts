import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostFeedRoutingModule } from './post-feed-routing.module';
import { PostFeedComponent } from './components/post-feed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    PostFeedComponent
  ],
  imports: [
    CommonModule,
    PostFeedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [
    PostFeedComponent
  ]
})
export class PostFeedModule { }
