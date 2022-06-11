import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditRoutingModule } from './profile-edit-routing.module';
import { ProfileEditComponent } from './components/profile-edit.component';
import { FooterModule} from '../layout/footer/footer.module';
import {HeaderNewModule} from '../layout/header-new/header-new.module';
import {SidebarModule} from '../layout/sidebar/sidebar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    ProfileEditRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule,
  ]
})
export class ProfileEditModule { }
