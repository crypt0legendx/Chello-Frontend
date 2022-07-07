import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCardRoutingModule } from './add-card-routing.module';
import { AddCardComponent } from './components/add-card.component';
import { FooterModule } from '../layout/footer/footer.module';
import { HeaderNewModule } from '../layout/header-new/header-new.module';
import { SidebarModule } from '../layout/sidebar/sidebar.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AddCardComponent
  ],
  imports: [
    CommonModule,
    AddCardRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    ToastrModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddCardModule { }