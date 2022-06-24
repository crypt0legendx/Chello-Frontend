import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-private-event-final',
  templateUrl: '../pages/private-event-final.component.html',
  styleUrls: ['../pages/private-event-final.component.scss']
})
export class PrivateEventFinalComponent implements OnInit {

  event:any = null;
  constructor(
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    if(this.getCurrentEvent() == null){
      this.router.navigate(['/event']);
    }else{
      const curEvent= this.getCurrentEvent();
      const nDate = new Date(curEvent.eventDate);
      this.event = {
          banner: curEvent.banner,
          eventDate: (nDate.getMonth()+1)+'-'+nDate.getDate()+'-'+nDate.getFullYear(),
          eventEndTime: this.getValidateTime(curEvent.eventEndTime),
          eventJoinPrice: curEvent.eventJoinPrice,
          eventStartTime: this.getValidateTime(curEvent.eventStartTime),
          miscInfo: curEvent.miscInfo,
          title: curEvent.title,
          type: curEvent.type,          
          _id: curEvent._id,
      }      
    }
     
  }

  getCurrentEvent(){
    return this.eventService.getCurrentEvent();
  }

  getValidateTime(dateTime:any){
    let suffix_time = " a.m";
    if(new Date(dateTime).getHours() >12){
      suffix_time = " p.m";
    }
    const hr = new Date(dateTime).getHours() >12 ? (new Date(dateTime).getHours()-12) : new Date(dateTime).getHours();
    const mins = new Date(dateTime).getMinutes();
    return this.pad(hr)+':'+this.pad(mins)+' '+suffix_time;
  }

  pad(d: Number) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

}
