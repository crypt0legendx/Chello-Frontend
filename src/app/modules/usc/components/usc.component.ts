import { Component, OnInit } from '@angular/core';
import { veriables } from '../../../utils/variables';
@Component({
  selector: 'app-usc',
  templateUrl: '../pages/usc.component.html',
  styleUrls: ['../pages/usc.component.scss']
})
export class UscComponent implements OnInit {

  constructor(
    public veriable: veriables
  ) { }

  ngOnInit(): void {
  }

}
