import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryRoutingModule } from './story-routing.module';
import { StoryComponent } from './components/story.component';


@NgModule({
  declarations: [
    StoryComponent
  ],
  imports: [
    CommonModule,
    StoryRoutingModule
  ],
  exports: [
    StoryComponent
  ]
})
export class StoryModule { }
