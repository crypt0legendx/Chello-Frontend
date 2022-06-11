import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataNotFoundRoutingModule } from './data-not-found-routing.module';
import { DataNotFoundComponent } from './components/data-not-found.component';
import { FooterModule } from '../layout/footer/footer.module'
import { HeaderNewModule } from '../layout/header-new/header-new.module'

@NgModule({
  declarations: [
    DataNotFoundComponent
  ],
  imports: [
    CommonModule,
    DataNotFoundRoutingModule,
    FooterModule,
    HeaderNewModule
  ]
})
export class DataNotFoundModule { }
