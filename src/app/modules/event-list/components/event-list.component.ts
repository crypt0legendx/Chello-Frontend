import { UploadService } from './../../../services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { bool } from 'aws-sdk/clients/signer';

@Component({
  selector: 'app-event-list',
  templateUrl: '../pages/event-list.component.html',
  styleUrls: ['../pages/event-list.component.scss']
})
export class EventListComponent implements OnInit {

  tabIndex:Number = 0; 
  page = 0;

  advancedSearch: boolean = false;
  searchedState:boolean = false;
  advancedSearchParams: any = {
      "pageNumber":0,
      "title":"",
      "type":"",
      "miscinfo":"",
      "username":"",
      "url":"",
      "date":""
  }
  scrollEnabled:bool = true;

  searchTitle:string = "";
  searchType:string = "";
  searchUsername:string = "";
  searchMiscInfo: string = "";
  searchURL: string = "";
  searchDate: string ="";

  events: any = [];
  myEvents: any = [];

  constructor(
    private eventService: EventService,
    private uploadService: UploadService,
    private router:Router,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeEvents();
  }

  setTabIndex(idx:Number){
    if(idx == this.tabIndex) return;
    this.tabIndex = idx;
    this.scrollEnabled = true;
    this.page = 0;
    this.advancedSearchParams = {
      "pageNumber":0,
      "title":"",
      "type":"",
      "miscinfo":"",
      "username":"",
      "url":"",
      "date":""
    }
    if(idx == 0){
      this.initializeEvents();
    }else{
      this.initializeMyEvents();
    }
  }

  setAdvancedSearch(val:boolean){
    this.advancedSearch = val;
    this.searchTitle = "";
    this.searchType = "";
    this.searchUsername = "";
    this.searchMiscInfo = "";
    this.searchURL = "";
    this.searchDate ="";
    this.initializeEvents();
    this.scrollEnabled = true;
    this.page = 0;
    this.advancedSearchParams = {
      "pageNumber":0,
      "title":"",
      "type":"",
      "miscinfo":"",
      "username":"",
      "url":"",
      "date":""
    }
  }

  initializeEvents(){
    const data = {
      "pageNumber":0
    }
    this.eventService.getEventFeed(data).subscribe(
      (success:any) => {
        this.events = success.eventData.map((d:any)=>{
          const nDate = new Date(d.eventDate);
          d.eventDate = this.pad((nDate.getMonth()+1))+'-'+this.pad(nDate.getDate())+'-'+nDate.getFullYear();        
          return d;
        });
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  initializeMyEvents(){
    const data = {
      "pageNumber":0
    }
    this.eventService.getMyEventFeed(data).subscribe(
      (success:any) => {
        this.myEvents = success.eventData.map((d:any)=>{
          const nDate = new Date(d.eventDate);
          d.eventDate = this.pad((nDate.getMonth()+1))+'-'+this.pad(nDate.getDate())+'-'+nDate.getFullYear();          
          return d;
        });
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  changedSearchBox(){
    this.page = 0;
    const data = {
      "pageNumber":this.page,
      "title":this.searchTitle,
      "type":"",
      "miscinfo":"",
      "username":"",
      "url":"",
      "date":""
    };
    
    this.eventService.getSearchEventFeed(data).subscribe(
      (success:any) => {
        this.events = success.eventData.map((d:any)=>{
          const nDate = new Date(d.eventDate);
          d.eventDate = this.pad((nDate.getMonth()+1))+'-'+this.pad(nDate.getDate())+'-'+nDate.getFullYear();          
          return d;
        });
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  searchEventsByTitle = async() =>{
      const data = {
        "pageNumber":this.page,
        "title":this.searchTitle,
        "type":"",
        "miscinfo":"",
        "username":"",
        "url":"",
        "date":""
      };
      
      this.eventService.getSearchEventFeed(data).subscribe(
        (success:any) => {
          const newEvents = success.eventData.map((d:any)=>{
            const nDate = new Date(d.eventDate);
            d.eventDate = this.pad((nDate.getMonth()+1))+'-'+this.pad(nDate.getDate())+'-'+nDate.getFullYear();          
            return d;
          });
          if(newEvents.length < 10)
          this.scrollEnabled = false;
          this.events = this.events.concat(newEvents);
        },
        (err)=>{
          console.log(err);
        }
      );
  }

  changedSearchForm(){
    this.page = 0;
    const data = {
      "pageNumber":this.page,
      "title":this.searchTitle,
      "type":this.searchType,
      "miscinfo":this.searchMiscInfo,
      "username":this.searchUsername,
      "url":this.searchURL,
      "date":new Date(this.searchDate + " 00:00")
    };

    console.log(data);
    
    this.eventService.getSearchEventFeed(data).subscribe(
      (success:any) => {
        this.events = success.eventData.map((d:any)=>{
          const nDate = new Date(d.eventDate);
          d.eventDate = this.pad((nDate.getMonth()+1))+'-'+this.pad(nDate.getDate())+'-'+nDate.getFullYear();          
          return d;
        });
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  searchEventsByAdvanced = async() =>{
    this.advancedSearchParams.page = this.page;
    
    this.eventService.getSearchEventFeed(this.advancedSearchParams).subscribe(
      (success:any) => {
        const newEvents = success.eventData.map((d:any)=>{
          const nDate = new Date(d.eventDate);
          d.eventDate = this.pad((nDate.getMonth()+1))+'-'+this.pad(nDate.getDate())+'-'+nDate.getFullYear();          
          return d;
        });
        if(newEvents.length < 10)
        this.scrollEnabled = false;
        this.events = this.events.concat(newEvents);
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  searchMyEvents = async() =>{
    const data = {
      "pageNumber":this.page,      
    };
    
    this.eventService.getMyEventFeed(data).subscribe(
      (success:any) => {
        const newEvents = success.eventData.map((d:any)=>{
          const nDate = new Date(d.eventDate);
          d.eventDate = this.pad((nDate.getMonth()+1))+'-'+this.pad(nDate.getDate())+'-'+nDate.getFullYear();          
          return d;
        });
        if(newEvents.length < 10)
        this.scrollEnabled = false;
        this.myEvents = this.myEvents.concat(newEvents);
      },
      (err)=>{
        console.log(err);
      }
    );
}

  updateEvent(e:any){
    this.eventService.setCurrentEvent(e);
    this.router.navigate(['/edit-event']);
    
  }

  deleteEvent(e:any){
    if(confirm("Are you sure to delete "+e.title)){
      this.uploadService.deleteFile(e.banner).then((res:any)=>{
        this.toastrService.success("Successfully deleted file on S3 bucket", "Delete File");
        const data = {
          "_id": e._id, 
        }
        this.eventService.deleteEvent(data).subscribe(
          (success: any)=>{
            console.log(success.data);
            this.router.navigate(['/event-list']);
            this.toastrService.success("Successfully deleted the event", "Delete Event");
            const mIdx = this.myEvents.findIndex((d: any) => d._id == e._id);
            const eIdx = this.events.findIndex((d: any) => d._id == e._id);
            if(mIdx != -1){
              this.myEvents.splice(mIdx, 1);
            }
            if(eIdx != -1){
              this.events.splice(mIdx, 1);
            }
          },
          (error) => {
            this.toastrService.error("Oops, failed to delete event", "Delete Event");    
          }
        )
      }).catch((error:any)=>{
        this.toastrService.error(error, "Failed to delete file");
      })    
    }
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

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50);
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    
    if (this.bottomReached()) {
      
      if(this.scrollEnabled){
      
        if(this.tabIndex == 0){
          this.page = this.page+1;
          if(this.advancedSearch){
            this.searchEventsByAdvanced();
          }else{
            this.searchEventsByTitle();            
          }          
        }else{         
          this.page = this.page+1;
          this.searchMyEvents();
        }        
      }
    }
  }

}
