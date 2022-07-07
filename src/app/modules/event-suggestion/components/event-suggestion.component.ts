import { EventService } from 'src/app/services/event.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-event-suggestion',
  templateUrl: '../pages/event-suggestion.component.html',
  styleUrls: ['../pages/event-suggestion.component.scss']
})
export class EventSuggestionComponent implements OnInit {
  events:any = [];
  searchText:string = "";
  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.eventService.getEventSuggestion({"search": ""}).subscribe(
      (success:any) => {
        this.events = success.eventData.map((d:any)=>{
          const nDate = new Date(d.eventDate);
          d.eventDate = this.pad((nDate.getMonth()+1))+'-'+this.pad(nDate.getDate())+'-'+nDate.getFullYear();
          d.eventStartTime = this.getValidateTime(d.eventStartTime);
          d.eventEndTime = this.getValidateTime(d.eventEndTime);
          return d;
        });
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  changedSearchBox(obj:any){
    this.eventService.getEventSuggestion({"search": obj.value}).subscribe(
      (success:any) => {
        this.events = success.eventData.map((d:any)=>{
          const nDate = new Date(d.eventDate);
          d.eventDate = this.pad((nDate.getMonth()+1))+'-'+this.pad(nDate.getDate())+'-'+nDate.getFullYear();
          d.eventStartTime = this.getValidateTime(d.eventStartTime);
          d.eventEndTime = this.getValidateTime(d.eventEndTime);
          return d;
        });
      },
      (err)=>{
        console.log(err);
      }
    );
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