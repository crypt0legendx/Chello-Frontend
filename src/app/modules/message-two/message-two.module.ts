import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageTwoRoutingModule } from './message-two-routing.module';
import { MessageTwoComponent } from './components/message-two.component';
import { MessageThreeModule } from '../message-three/message-three.module';
@NgModule({
  declarations: [
    MessageTwoComponent
  ],
  imports: [
    CommonModule,
    MessageTwoRoutingModule,
    MessageThreeModule
  ],
  exports:[
    MessageTwoComponent
  ]
})
export class MessageTwoModule { }
