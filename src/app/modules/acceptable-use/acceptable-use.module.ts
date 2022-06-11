import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceptableUseRoutingModule } from './acceptable-use-routing.module';
import { AcceptableUseComponent } from './components/acceptable-use.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderModule } from '../layout/header/header.module'



@NgModule({
  declarations: [
    AcceptableUseComponent
  ],
  imports: [
    CommonModule,
    AcceptableUseRoutingModule,
    FooterModule,
    HeaderModule
  ]
})
export class AcceptableUseModule { }
