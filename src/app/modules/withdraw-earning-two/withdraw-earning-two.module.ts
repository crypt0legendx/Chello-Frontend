import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WithdrawEarningTwoRoutingModule } from './withdraw-earning-two-routing.module';
import { WithdrawEarningTwoComponent } from './components/withdraw-earning-two.component';
import { FooterModule} from '../layout/footer/footer.module'
import {HeaderNewModule} from '../layout/header-new/header-new.module'
import {SidebarModule} from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    WithdrawEarningTwoComponent
  ],
  imports: [
    CommonModule,
    WithdrawEarningTwoRoutingModule,
    FooterModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderNewModule,
    SidebarModule,
  ]
})
export class WithdrawEarningTwoModule { }
