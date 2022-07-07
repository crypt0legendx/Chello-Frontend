import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageThreeRoutingModule } from './message-three-routing.module';
import { MessageThreeComponent } from './components/message-three.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MessageThreeComponent
  ],
  imports: [
    CommonModule,
    MessageThreeRoutingModule,
    FormsModule
  ],
  exports:[
    MessageThreeComponent
  ]
})
export class MessageThreeModule { }
