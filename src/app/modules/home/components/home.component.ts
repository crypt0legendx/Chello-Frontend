import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { PostService } from '../../../services/post.service';
import { ProfileService } from '../../../services/profile.service';
import { UploadService } from '../../../services/upload.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { routers } from '../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {PostListComponent} from '../../layout/post-list/components/post-list.component';

declare var swal: any;
declare var $: any;
declare var Zuck: any

@Component({
  selector: 'app-home',
  templateUrl: '../pages/home.component.html',
  styleUrls: ['../pages/home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(PostListComponent ) child: PostListComponent | undefined ; 
  feedForm!: FormGroup;
  submitted: any;
  userJsonData: any;
  isShown: boolean = false; // hidden by default

  isAddImage: boolean = false;
  isAddVideo: boolean = false;
  isAddAudio: boolean = false;

  selectedFiles: any = '';
  imageSrc: string = '';
  filePath: any = '';
  duration: any = 0;
  pageNumber: number = 0;
  public postOption: number = 0;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private uploadService: UploadService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }

  ngOnInit(): void {
    let retrievedObject: any = localStorage.getItem('userData');
    if (retrievedObject) {
      this.userJsonData = JSON.parse(retrievedObject);
      console.log(this.userJsonData);
    } else {
      //this.router.navigate([this.routernavigate.login]);
    }

    this.feedForm = this.formBuilder.group({
      postTxt: ['', Validators.required]
    });

    //this.getFeed();
  }



  get f() { return this.feedForm.controls; }

  async postFeed() {
    if (this.isAddImage === true) {
      this.uploadImage(this.filePath, "addImage");
    } else if (this.isAddVideo === true) {
      this.uploadImage(this.filePath, "addVideo");
    } else if (this.isAddAudio === true) {
      this.uploadImage(this.filePath, "addAudio");
    } else {
      var postData = {
        "title": this.f.postTxt.value,
        "type": "text",
        "fileName": "",
        "thumbnail": ""
      }

      console.log(postData);

      this.submitted = true;
      if (this.feedForm.invalid) {
        return;
      }
      else {
        this.spinner.show();
        this.postService.postFeed(postData).subscribe((data: any) => {
          console.log(data);
          if (data['statusCode'] === 200) {
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
    }
  }

  async postFiles(postData: any) {
    this.spinner.show();
    console.log(postData);
    this.postService.postFeed(postData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.isAddImage = false;
        this.isAddVideo = false;
        this.isAddAudio = false;
        this.feedForm.reset();
        this.selectedFiles = "";
        this.filePath = "";
        this.child?.getAllFeeds();
        //this.getFeed();
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

  async getFeed() {
    this.spinner.show();
    this.postService.getUserFeed({"pageNumber": this.pageNumber}).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.spinner.hide();
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

  async openFileSelector(selectorType: any) {
    if (selectorType === "story") {
      $("#addStory").trigger("click");
    } else if (selectorType === "addImage") {
      $("#addImage").trigger("click");
    } else if (selectorType === "addVideo") {
      $("#addVideo").trigger("click");
    } else if (selectorType === "addAudio") {
      $("#addAudio").trigger("click");
    }
  }

  selectFile(event: any, fileType: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file.name);
      this.filePath = Math.random() * 10000000000000000 + '_' + file.name;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      }
      
      this.selectedFiles = file;
      if (fileType === "story") {
        this.uploadImage(this.filePath, "story");
      } else if (fileType === "addImage") {
        this.isAddImage = true;
      } else if (fileType === "addVideo") {
        this.isAddVideo = true;
      } else if (fileType === "addAudio") {
        this.isAddAudio = true;
      }

      event.target.value = null;
    }
  }

  async uploadImage(filePath: any, jsonKey: any) {
    this.spinner.show();
    const file = this.selectedFiles;
    let res: any = await this.uploadService.uploadFile(file, filePath);
    console.log(res);

    if (jsonKey === "story") {
      this.uploadStory({
        "name": res['Location'],
        "fileType": "image"
      })
    } else if (jsonKey === "addImage") {
      let sendData = {
        "title": this.f.postTxt.value,
        "type": "image",
        "fileName": res['Location'],
        "thumbnail": res['Location']
      }
      
      this.postFiles(sendData);
    } else if (jsonKey === "addVideo") {
      let sendData = {
        "title": this.f.postTxt.value,
        "type": "video",
        "fileName": res['Location'],
        "thumbnail": res['Location'],
        "duration": this.duration
      }
      
      this.postFiles(sendData);
    } else if (jsonKey === "addAudio") {
      let sendData = {
        "title": this.f.postTxt.value,
        "type": "audio",
        "fileName": res['Location'],
        "thumbnail": res['Location'],
        "duration": this.duration
      }
      
      this.postFiles(sendData);
    }
  }

  uploadStory(postData: any) {
    console.log(postData);
    this.spinner.show();

    this.postService.postStory(postData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.spinner.hide();
        this.toastr.success(data['message']);
      }
      else {
        this.spinner.hide();
        this.toastr.error(data['message']);
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error['message']);
    });
  }

  removeAttachment(attachmentType: any) {
    if (attachmentType === "image") {
      this.selectedFiles = "";
      this.filePath = "";
      this.isAddImage = false;
    }
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }


}
