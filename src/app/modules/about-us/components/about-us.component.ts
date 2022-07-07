import { Component, OnInit } from '@angular/core';
import { veriables } from '../../../utils/variables';
@Component({
  selector: 'app-about-us',
  templateUrl: '../pages/about-us.component.html',
  styleUrls: ['../pages/about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(
    public veriable: veriables
  ) { }

  ngOnInit(): void {
  }

}
