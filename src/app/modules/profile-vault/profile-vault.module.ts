import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileVaultRoutingModule } from './profile-vault-routing.module';
import { ProfileVaultComponent } from './components/profile-vault.component';
import { FooterModule} from '../layout/footer/footer.module'
import {HeaderNewModule} from '../layout/header-new/header-new.module'
import {SidebarModule} from '../layout/sidebar/sidebar.module'
import {SuggestionsModule} from '../layout/suggestions/suggestions.module'

@NgModule({
  declarations: [
    ProfileVaultComponent
  ],
  imports: [
    CommonModule,
    ProfileVaultRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule
  ]
})
export class ProfileVaultModule { }
