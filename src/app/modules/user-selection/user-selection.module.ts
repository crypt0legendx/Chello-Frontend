import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSelectionRoutingModule } from './user-selection-routing.module';
import { UserSelectionComponent } from './components/user-selection.component';
import { FooterModule } from '../layout/footer/footer.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    UserSelectionComponent
  ],
  imports: [
    CommonModule,
    UserSelectionRoutingModule,
    FooterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxIntlTelInputModule
  ]
})
export class UserSelectionModule { }
