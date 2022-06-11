import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSelectionRoutingModule } from './user-selection-routing.module';
import { UserSelectionComponent } from './components/user-selection.component';
import { FooterModule } from '../layout/footer/footer.module'

@NgModule({
  declarations: [
    UserSelectionComponent
  ],
  imports: [
    CommonModule,
    UserSelectionRoutingModule,
    FooterModule
  ]
})
export class UserSelectionModule { }
