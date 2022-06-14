import { EventService } from 'src/app/services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: '../pages/event-list.component.html',
  styleUrls: ['../pages/event-list.component.scss']
})
export class EventListComponent implements OnInit {

  tabIndex:Number = 0; 

  advancedSearch: boolean = false;
  searchText:string = "";

  events: any = [];

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    const data = {
      "pageNumber":0
    }
    this.eventService.getEventFeed(data).subscribe(
      (success:any) => {
        this.events = success.eventData;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  setTabIndex(idx:Number){
    this.tabIndex = idx;
  }

  setAdvancedSearch(val:boolean){
    this.advancedSearch = val;
  }

  searchEvents(searchVal:string){

  }

}
