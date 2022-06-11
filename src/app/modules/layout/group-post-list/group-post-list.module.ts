import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupPostListRoutingModule } from './group-post-list-routing.module';
import { GroupPostListComponent } from './components/group-post-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    GroupPostListComponent
  ],
  imports: [
    CommonModule,
    GroupPostListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [
    GroupPostListComponent
  ]
})
export class GroupPostListModule { }
