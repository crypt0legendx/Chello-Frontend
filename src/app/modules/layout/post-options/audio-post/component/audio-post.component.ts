import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { GroupService } from "src/app/services/group.service";
import { PostService } from "src/app/services/post.service";
import { UploadService } from "src/app/services/upload.service";
import * as RecordRTC from 'recordrtc';

declare var $ : any;

@Component({
    selector: 'app-audio-post',
    templateUrl: '../pages/audio-post.component.html',
    styleUrls: ['../pages/audio-post.component.scss']
})

export class AudioPostComponent {

    
    feedForm!: FormGroup;
    submitted: any;
    retrievedGroupDetails: any;
    isAddAudio: boolean = false;

    selectedFiles: any[] = [];
    audioSrc: any[] = [];
    filePath: any[] = [];
    // RTC part
    isRecording = false;
    private record : any;
    // private url;
    private urls:any[] = [];
    private error :any;

    constructor(
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private uploadService: UploadService,
        private postService: PostService,
        private groupService: GroupService,
        private toastr: ToastrService,        
    ) {}    

    
  ngOnInit(): void {
    this.feedForm = this.formBuilder.group({
      postTxt: ['', Validators.required]
    });

    this.retrievedGroupDetails = localStorage.getItem('groupDetails');
    this.retrievedGroupDetails = JSON.parse(this.retrievedGroupDetails);
  }

  get f() { return this.feedForm.controls; }

  postFeed() {
    this.uploadAudio(this.filePath, "addAudio");
}

postGroupFeed() {
  this.uploadAudio(this.filePath, "addAudio");
}

async openFileSelector(selectorType: any) {
    $("#addAudio").trigger("click");    
}


removeAttachment() {              
  this.audioSrc.splice(0, 1);
  console.log("removeAttachment, selected files", this.selectedFiles);
  this.selectedFiles.splice(0, 1);
  this.filePath.splice(0, 1);
  this.isAddAudio = false;    
}


selectFile(event: any, fileType: any) {    
  if (event.target.files && event.target.files[0]) {                   
      const reader = new FileReader();
      const file = event.target.files[0];          
      this.selectedFiles.push(file);
      console.log('selected file name', this.selectedFiles);
      this.filePath.push(Math.random() * 10000000000000000 + '_' + file.name);
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("imgSrc", reader.result as string);
        this.audioSrc.push({type: fileType, value: reader.result as string});          
    }                 
    console.log('audioData', this.filePath);
      this.isAddAudio = true;
    event.target.value = null;
  }
}


  
  async uploadAudio(filePath: any, jsonKey: any) {
    this.spinner.show();
    let today = new Date();
    const file = this.selectedFiles;
    let res: any = await this.uploadService.uploadFile(file, filePath);
    console.log(res);
    if(!this.retrievedGroupDetails){        
            let sendData = {
            "title": this.f.postTxt.value,
            "type": "Audio",
            "fileName": res['Location'],
            "thumbnail": res['Location'],
            "scheduled": false,
            "scheduledDateTime": today.toISOString()
            }
    
            this.postFiles(sendData);    
        }
     else{      
        let sendData = {
          "group_id": this.retrievedGroupDetails['_id'],
          "title": this.f.postTxt.value,
          "type": "Audio",
          "fileName": res['Location'],
          "thumbnail": res['Location']
        }
        this.postGroupFiles(sendData);
      }    
  } 

  
  async postFiles(postData: any) {
    this.spinner.show();
    console.log(postData);
    this.postService.postFeed(postData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.isAddAudio = false;
        this.feedForm.reset();
        this.selectedFiles = [];
        this.filePath = [];
        this.spinner.hide();
        this.submitted = false;
        this.toastr.success("Post added successfully");
      }
      else {
        this.spinner.hide();
        this.submitted = false;
        this.toastr.error(data['message']);
      }
    }, (error:any) => {
      this.spinner.hide();
      this.submitted = false;
      this.toastr.error(error['message']);
    });
  }

  
  async postGroupFiles(postData: any) {
    this.spinner.show();
    console.log(postData);
    this.groupService.createGroupPost(postData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.isAddAudio = false;
        this.feedForm.reset();
        this.selectedFiles = [];
        this.filePath = [];
        this.spinner.hide();
        this.submitted = false;
        this.toastr.success("Post added successfully");        
      }
      else {
        this.spinner.hide();
        this.submitted = false;
        this.toastr.error(data['message']);
      }
    }, (error:any) => {
      this.spinner.hide();
      this.submitted = false;
      this.toastr.error(error['message']);
    });
  }


  
  startRecording() {
    this.isRecording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream:any) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1
    };

    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.isRecording = false;
    this.record.stop(this.processRecording.bind(this));
    this.filePath.splice(0, 1, Math.random() * 10000000000000000 + '_' + 'record' + Date.now.toString);
    this.selectedFiles.splice(0,1,this.record);
    
    console.log('data', this.record);
  }

  processRecording(blob:any) {    
    this.urls.push(URL.createObjectURL(blob)) ;
  }


  errorCallback(error:any) {
    this.error = 'Can not play audio in your browser';
  }

}