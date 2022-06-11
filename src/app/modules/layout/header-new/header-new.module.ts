import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderNewRoutingModule } from './header-new-routing.module';
import { HeaderNewComponent } from './components/header-new.component';


@NgModule({
  declarations: [
    HeaderNewComponent
  ],
  imports: [
    CommonModule,
    HeaderNewRoutingModule
  ],
  exports:[
    HeaderNewComponent
  ]
})
export class HeaderNewModule { }
