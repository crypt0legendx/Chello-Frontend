import { Component, OnInit } from '@angular/core';
import { veriables } from '../../../utils/variables';
@Component({
  selector: 'app-faq',
  templateUrl: '../pages/faq.component.html',
  styleUrls: ['../pages/faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(
    public veriable: veriables
  ) { }

  ngOnInit(): void {
  }

}
