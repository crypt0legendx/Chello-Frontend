import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostListRoutingModule } from './post-list-routing.module';
import { PostListComponent } from './components/post-list.component';
import { PaymentModule } from '../../payment/payment.module';


@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    CommonModule,
    PostListRoutingModule,
    PaymentModule    
  ],
  exports: [
    PostListComponent
  ]
})
export class PostListModule { }
