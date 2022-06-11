import { Component, OnInit } from '@angular/core';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-event',
  templateUrl: '../pages/event.component.html',
  styleUrls: ['../pages/event.component.scss']
})
export class EventComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openEventPasswordModel(){
    $("#eventPasswordModel").modal('show');
  }

}
