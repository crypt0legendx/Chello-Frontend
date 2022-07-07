import { Component, OnInit } from '@angular/core';
import { veriables } from '../../../utils/variables';
@Component({
  selector: 'app-referral',
  templateUrl: '../pages/referral.component.html',
  styleUrls: ['../pages/referral.component.scss']
})
export class ReferralComponent implements OnInit {

  constructor(
    public veriable: veriables
  ) { }

  ngOnInit(): void {
  }

}
