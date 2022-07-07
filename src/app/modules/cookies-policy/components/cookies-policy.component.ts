import { Component, OnInit } from '@angular/core';
import { veriables } from '../../../utils/variables';
@Component({
  selector: 'app-cookies-policy',
  templateUrl: '../pages/cookies-policy.component.html',
  styleUrls: ['../pages/cookies-policy.component.scss']
})
export class CookiesPolicyComponent implements OnInit {

  constructor(
    public veriable: veriables
  ) { }

  ngOnInit(): void {
  }

}
