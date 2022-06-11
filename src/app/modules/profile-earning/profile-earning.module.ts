import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileEarningRoutingModule } from './profile-earning-routing.module';
import { ProfileEarningComponent } from './components/profile-earning.component';
import { FooterModule} from '../layout/footer/footer.module'
import {HeaderNewModule} from '../layout/header-new/header-new.module'
import {SidebarModule} from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    ProfileEarningComponent
  ],
  imports: [
    CommonModule,
    ProfileEarningRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
  ]
})
export class ProfileEarningModule { }
