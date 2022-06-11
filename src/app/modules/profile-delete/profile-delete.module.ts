import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileDeleteRoutingModule } from './profile-delete-routing.module';
import { ProfileDeleteComponent } from './components/profile-delete.component';
import { FooterModule} from '../layout/footer/footer.module'
import {HeaderNewModule} from '../layout/header-new/header-new.module'
import {SidebarModule} from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    ProfileDeleteComponent
  ],
  imports: [
    CommonModule,
    ProfileDeleteRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
  ]
})
export class ProfileDeleteModule { }
