import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './components/features.component';
import {FooterModule} from '../layout/footer/footer.module'
import {HeaderModule} from '../layout/header/header.module'

@NgModule({
  declarations: [
    FeaturesComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    FooterModule,
    HeaderModule
  ]
})
export class FeaturesModule { }
