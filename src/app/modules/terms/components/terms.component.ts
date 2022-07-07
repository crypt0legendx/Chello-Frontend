import { Component, OnInit } from '@angular/core';
import { veriables } from '../../../utils/variables';
@Component({
  selector: 'app-terms',
  templateUrl: '../pages/terms.component.html',
  styleUrls: ['../pages/terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(
    public veriable: veriables
  ) { }

  ngOnInit(): void {
  }

}
