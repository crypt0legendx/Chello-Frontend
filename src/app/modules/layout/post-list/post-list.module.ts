import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListRoutingModule } from './post-list-routing.module';
import { PostListComponent } from './components/post-list.component';
import { PostService } from '../../../services/post.service';

@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    CommonModule,
    PostListRoutingModule
  ],
  exports: [
    PostListComponent
  ],
  providers: [PostService],
})
export class PostListModule { }
