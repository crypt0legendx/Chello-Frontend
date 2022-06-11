import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PollRoutingModule } from './poll-routing.module';
import { PollComponent } from './components/poll.component';
import {FooterModule} from '../layout/footer/footer.module'
import {HeaderModule} from '../layout/header/header.module'
import { SidebarModule } from '../layout/sidebar/sidebar.module';
import { SuggestionsModule } from '../layout/suggestions/suggestions.module';
import { PostFeedModule } from '../layout/post-feed/post-feed.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    PollComponent
  ],
  imports: [
    CommonModule,
    PollRoutingModule,
    FooterModule,
    HeaderModule,
    SidebarModule,
    SuggestionsModule,
    PostFeedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class PollModule { }
