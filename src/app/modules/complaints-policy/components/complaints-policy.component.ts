import { Component, OnInit } from '@angular/core';
import { veriables } from '../../../utils/variables';
@Component({
  selector: 'app-complaints-policy',
  templateUrl: '../pages/complaints-policy.component.html',
  styleUrls: ['../pages/complaints-policy.component.scss']
})
export class ComplaintsPolicyComponent implements OnInit {

  constructor(
    public veriable: veriables
  ) { }

  ngOnInit(): void {
  }

}
