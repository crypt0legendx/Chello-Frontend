import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { TimedPostComponent } from './timed-post/component/timed-post.component';
import { PostFeedModule } from '../post-feed/post-feed.module';
import { FancamComponent } from './fancam-post/component/fancam-post.component';
import { PhotoPostComponent } from './photo-post/component/photo-post.component';
import { RouterModule } from '@angular/router';
import { VidoPostComponent } from './video-post/component/video-post.component';
import { AudioPostComponent } from './audio-post/component/audio-post.component';


@NgModule({
  declarations: [
    TimedPostComponent,
    FancamComponent,
    PhotoPostComponent,
    VidoPostComponent,
    AudioPostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule,
    PostFeedModule,    
    RouterModule
  ],
  bootstrap: [
    
  ],
  exports:[
    TimedPostComponent,
    PhotoPostComponent,
    VidoPostComponent,
    AudioPostComponent,
    FancamComponent
  ]
})
export class PostOptionsModule { }
