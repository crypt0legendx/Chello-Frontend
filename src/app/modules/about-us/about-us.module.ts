import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './components/about-us.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderModule } from '../layout/header/header.module'

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    FooterModule,
    HeaderModule
  ]
})
export class AboutUsModule { }
