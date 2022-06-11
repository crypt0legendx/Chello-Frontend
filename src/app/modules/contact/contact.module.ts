import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './components/contact.component';
import {FooterModule} from '../layout/footer/footer.module'
import {HeaderModule} from '../layout/header/header.module'



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FooterModule,
    HeaderModule
  ]
})
export class ContactModule { }
