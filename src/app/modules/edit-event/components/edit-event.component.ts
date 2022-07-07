import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { UploadService } from './../../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-event',
  templateUrl: '../pages/edit-event.component.html',
  styleUrls: ['../pages/edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  //event info, which be stored in database.
  eventName: string ="";
  eventType: string ="";
  eventDate: any;
  startTime: string ="";
  endTime: string ="";
  eventPrice: Number = 0;
  miscInfo: string = "";
  fileUrl:string ="";
  eventId:string = "";
  selectedFiles: any;
  constructor(
    private uploadService: UploadService,
    private router:Router,
    private eventService:EventService,
    private toastrService: ToastrService,
    private datePipe: DatePipe
  ) { }
  ngOnInit(): void {
    if(this.getCurrentEvent() == null){
      this.router.navigate(['/event']);
    }else{
      const curEvent = this.eventService.getCurrentEvent();
      this.eventName = curEvent.title;
      this.eventType = curEvent.type;
      this.eventDate = this.datePipe.transform(new Date(curEvent.eventDate), 'yyyy-MM-dd');
      this.startTime = this.getTime(curEvent.eventStartTime);
      this.endTime = this.getTime(curEvent.eventEndTime);
      this.eventPrice = curEvent.eventJoinPrice;
      this.miscInfo = curEvent.miscInfo;
      this.fileUrl = curEvent.banner;
      this.eventId = curEvent._id;
    }
  }

  getCurrentEvent(){
    return this.eventService.getCurrentEvent();
  }
  submitForm(form: NgForm){
    if(form.valid){
      const data = {
        "title": this.eventName,
        "type": this.eventType,
        "eventDate": new Date(this.eventDate + ' 00:00'),
        "eventStartTime": new Date(this.eventDate + ' '+this.startTime),
        "eventEndTime": new Date(this.eventDate + ' '+this.endTime),
        "eventJoinPrice": this.eventPrice,
        "miscInfo": this.miscInfo,
        "banner": this.fileUrl,
        "eventId":this.eventId
      }
      this.eventService.editEvent(data).subscribe(
        (success: any)=>{
          console.log(success.data);
          this.router.navigate(['/event-list']);
          this.toastrService.success("Successfully updated the event", "Update Event");
        },
        (error) => {
          this.toastrService.error("Oops, failed to update event", "Update Event");    
        }
      )
    }else{
      this.toastrService.error("Oops, failed to validate form","Form validation");
    }
  }
  uploadFile = async()=>{
    const file = this.selectedFiles.item(0);
    const res = await this.uploadService.uploadFile(file, file.name);
    return res;
  }
  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }

  getTime(dateTime:any){
    const hr = new Date(dateTime).getHours();
    const mins = new Date(dateTime).getMinutes();
    return this.pad(hr)+':'+this.pad(mins);
  }

  pad(d: Number) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }
}
