import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListRoutingModule } from './post-list-routing.module';
import { PostListComponent } from './components/post-list.component';
import { PaymentModule } from '../../payment/payment.module';
import { PostService } from '../../../services/post.service';
import { PostsFilterPipe } from 'src/app/pipe/postFilter.pipe';

@NgModule({
  declarations: [
    PostListComponent,
    PostsFilterPipe
  ],
  imports: [
    CommonModule,
    PostListRoutingModule,
    PaymentModule
  ],
  exports: [
    PostListComponent
  ],
  providers: [PostService],
})
export class PostListModule { }
