import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawEarningOneRoutingModule } from './withdraw-earning-one-routing.module';
import { WithdrawEarningOneComponent } from './components/withdraw-earning-one.component';
import { FooterModule} from '../layout/footer/footer.module'
import {HeaderNewModule} from '../layout/header-new/header-new.module'
import {SidebarModule} from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    WithdrawEarningOneComponent
  ],
  imports: [
    CommonModule,
    WithdrawEarningOneRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
  ]
})
export class WithdrawEarningOneModule { }
