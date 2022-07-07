import { Router } from '@angular/router';
import { EventService } from './../../../services/event.service';
import { UploadService } from './../../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-event',
  templateUrl: '../pages/create-event.component.html',
  styleUrls: ['../pages/create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  //event info, which be stored in database.
  eventName: string ="";
  eventType: string ="";
  eventDate: string ="";
  startTime: string ="";
  endTime: string ="";
  eventPrice: Number = 0;
  miscInfo: string = "";
  fileUrl:string ="";
  selectedFiles: any;
  constructor(
    private uploadService: UploadService,
    private toastrService: ToastrService,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  submitForm(form: NgForm){
    if(form.valid){
      this.uploadFile().then((res:any)=>{
        this.toastrService.success("Successfully uploaded file to S3 Bucket", "Upload File");
        const data = {
          "title": this.eventName,
          "type": this.eventType,
          "eventDate": new Date(this.eventDate + ' 00:00'),
          "eventStartTime": new Date(this.eventDate + ' '+this.startTime),
          "eventEndTime": new Date(this.eventDate + ' '+this.endTime),
          "eventJoinPrice": this.eventPrice,
          "miscInfo": this.miscInfo,
          "banner": res.key
        }
        this.eventService.createEvent(data).subscribe(
          (success: any)=>{
            console.log(success.data.privateEventData);
            this.eventService.setCurrentEvent(success.data.privateEventData);
            this.router.navigate(['/private-event-final']);
            this.toastrService.success("Successfully created the event", "Create Event");
          },
          (error: any) => {
            this.toastrService.error("Oops, failed to create event", "Create Event");    
          }
        )
        console.log(res);
      }).catch((res)=>{
        this.toastrService.error("Oops, failed to upload file", "Upload File");
      })
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
}
