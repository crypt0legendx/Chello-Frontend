import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-private-event-final',
  templateUrl: '../pages/private-event-final.component.html',
  styleUrls: ['../pages/private-event-final.component.scss']
})
export class PrivateEventFinalComponent implements OnInit {

  event:any = null;
  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.getCurrentEvent() == null){
      this.router.navigate(['/event']);
    }else{
      this.event=this.getCurrentEvent();
    }
     
  }

  getCurrentEvent(){
    return this.eventService.getCurrentEvent();
  }

}
