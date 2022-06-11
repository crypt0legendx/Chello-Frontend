import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePhotoRoutingModule } from './profile-photo-routing.module';
import { ProfilePhotoComponent } from './components/profile-photo.component';
import { FooterModule} from '../layout/footer/footer.module'
import {HeaderNewModule} from '../layout/header-new/header-new.module'
import {SidebarModule} from '../layout/sidebar/sidebar.module'
import {SuggestionsModule} from '../layout/suggestions/suggestions.module'
@NgModule({
  declarations: [
    ProfilePhotoComponent
  ],
  imports: [
    CommonModule,
    ProfilePhotoRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule
  ]
})
export class ProfilePhotoModule { }
