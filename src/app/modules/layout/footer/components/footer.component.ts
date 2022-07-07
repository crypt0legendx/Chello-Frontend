import { Component, OnInit } from '@angular/core';
import { veriables } from '../../../../utils/variables';
@Component({
  selector: 'app-footer',
  templateUrl: '../pages/footer.component.html',
  styleUrls: ['../pages/footer.component.scss']
})
export class FooterComponent implements OnInit {

  copyrightYear = new Date().getUTCFullYear();
  
  constructor(
    public veriable: veriables,
  ) { }

  ngOnInit(): void {
  }

}
