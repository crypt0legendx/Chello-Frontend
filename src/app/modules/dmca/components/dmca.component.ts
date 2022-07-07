import { Component, OnInit } from '@angular/core';
import { veriables } from '../../../utils/variables';
@Component({
  selector: 'app-dmca',
  templateUrl: '../pages/dmca.component.html',
  styleUrls: ['../pages/dmca.component.scss']
})
export class DmcaComponent implements OnInit {

  constructor(
    public veriable: veriables
  ) { }

  ngOnInit(): void {
  }

}
