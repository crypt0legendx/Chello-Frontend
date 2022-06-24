import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { GroupService } from "src/app/services/group.service";
import { PostService } from "src/app/services/post.service";
import { UploadService } from "src/app/services/upload.service";

declare var $: any;

@Component({
    selector: 'app-post-photo',
    templateUrl: '../pages/photo-post.component.html',
    styleUrls: ['../pages/photo-post.component.scss'],    
})

export class PhotoPostComponent {

    feedForm!: FormGroup;
    submitted: any;
    retrievedGroupDetails: any;
    isAddImage: boolean = false;

    selectedFiles: any[] = [];
    imageSrc: any[] = [];
    filePath: any[] = [];
    previewFilePath: any[] = [];

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
      this.uploadImage(this.filePath, "addImage");
  }

  postGroupFeed() {
    this.uploadImage(this.filePath, "addImage");
  }

  async openFileSelector(selectorType: any) {
      $("#addImage").trigger("click");    
  }

  
  removeAttachment(imgIndex: number) {          
    const selectedIndex = this.selectedFiles.indexOf(imgIndex); 
    console.log('removeAttachment - imgIndex', imgIndex);
    this.imageSrc.splice(imgIndex, 1);
    console.log("removeAttachment, selected files", this.selectedFiles);
    this.selectedFiles.splice(imgIndex, 1);
    this.filePath.splice(imgIndex, 1);
    this.isAddImage = false;    
}


selectFile(event: any, fileType: any) {    
    if (event.target.files && event.target.files[0]) {      
      const filesAmount = event.target.files.length;
      if(this.selectedFiles.length + filesAmount > 8) {
        this.toastr.warning("You can only add maximum 8 photos");
      } else {
          for (let i = 0; i < filesAmount; i++) {            
            const reader = new FileReader();
            const file = event.target.files[i];
            const prePath = window.URL.createObjectURL(file);
            this.previewFilePath.push(prePath);
            this.selectedFiles.push(file);
            console.log('selected file name', this.selectedFiles);
            this.filePath.push(Math.random() * 10000000000000000 + '_' + file.name);
            reader.readAsDataURL(file);
            reader.onload = () => {
              console.log("imgSrc", reader.result as string);
              this.imageSrc.push({type: fileType, value: reader.result as string});
            }        
          }   
      }                 
      console.log('imagedata', this.filePath);
        this.isAddImage = true;
      event.target.value = null;
    }
  }

  
  async uploadImage(filePath: any, jsonKey: any) {
    this.spinner.show();
    let today = new Date();
    const file = this.selectedFiles;
    let res: any = await this.uploadService.uploadFile(file, filePath);
    console.log(res);
    if(!this.retrievedGroupDetails){        
            let sendData = {
            "title": this.f.postTxt.value,
            "type": "image",
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
          "type": "image",
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
        this.isAddImage = false;
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
    }, (error) => {
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
        this.isAddImage = false;
        this.feedForm.reset();
        this.selectedFiles = [];
        this.filePath = [];
        this.spinner.hide();
        this.submitted = false;
        this.toastr.success("Post added successfully");
        // this.groupPostListComponent.getAllGroupFeeds();
      }
      else {
        this.spinner.hide();
        this.submitted = false;
        this.toastr.error(data['message']);
      }
    }, (error) => {
      this.spinner.hide();
      this.submitted = false;
      this.toastr.error(error['message']);
    });
  }


}