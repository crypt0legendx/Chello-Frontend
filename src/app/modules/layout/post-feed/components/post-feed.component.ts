import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { PostService } from '../../../../services/post.service';
import { ProfileService } from '../../../../services/profile.service';
import { UploadService } from '../../../../services/upload.service';
import { GroupService } from '../../../../services/group.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { routers } from '../../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { PostListComponent } from '../../post-list/components/post-list.component';
import { GroupPostListComponent } from '../../group-post-list/components/group-post-list.component';
import { HomeComponent } from 'src/app/modules/home/components/home.component';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-post-feed',
  templateUrl: '../pages/post-feed.component.html',
  styleUrls: ['../pages/post-feed.component.scss'],
  providers: [PostListComponent, GroupPostListComponent],
})
export class PostFeedComponent implements OnInit {

  feedForm!: FormGroup;
  submitted: any;
  userJsonData: any;
  isShown: boolean = false; // hidden by default

  isAddImage: boolean = false;
  isAddVideo: boolean = false;
  isAddAudio: boolean = false;

  selectedFiles: any[] = [];
  imageSrc: any[] = [];
  filePath: any[] = [];
  duration: any = 0;

  totalPosts: any;
  userPosts: any;
  retrievedGroupDetails: any;

  restrictWords: any = ["abduct", "abducted", "abducting", "abduction", "asphyxia", "asphyxiate", "asphyxiation", "asphyxicate", "asphyxication", "beastiality", "bestiality", "blackmail", "cannibal", "child", "coma", "comatose", "Flogging", "jailbait", "kidnap", "kidnapped", "kidnapping", "molest", "molested", "molesting", "mutilate", "mutilation", "necrophilia", "nigger", "pedo", "pedophile", "pedophilia", "preteen", "prostituted", "prostituting", "prostitution", "rape", "raping", "rapist", "strangled", "strangling", "strangulation", "suffocate", "suffocation", "teen", "torture", "tortured", "unconscious", "unconsciousness", "underage", "unwilling", "vomit", "vomitted", "vomiting", "young", "zoophilia"];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private uploadService: UploadService,
    private groupService: GroupService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private postListComponent: PostListComponent,
    private groupPostListComponent: GroupPostListComponent,
    private homeComponent: HomeComponent
  ) { }

  ngOnInit(): void {
    this.feedForm = this.formBuilder.group({
      postTxt: ['', Validators.required]
    });

    if (this.router.url === "/group-detail-new") {
      this.retrievedGroupDetails = localStorage.getItem('groupDetails');
      this.retrievedGroupDetails = JSON.parse(this.retrievedGroupDetails);
    } else {
      this.retrievedGroupDetails = "";
    }
  }

  get f() { return this.feedForm.controls; }

  async postFeed() {
    let today = new Date()
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
        "thumbnail": "",
        "scheduled": false,
        "scheduledDateTime": today.toISOString()
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
            this.feedForm.controls.postTxt.setValue("");
            this.postListComponent.getAllFeeds();
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

  async postGroupFeed() {
    let today = new Date();
    if (this.isAddImage === true) {
      this.uploadImage(this.filePath, "addImage");
    } else if (this.isAddVideo === true) {
      this.uploadImage(this.filePath, "addVideo");
    } else if (this.isAddAudio === true) {
      this.uploadImage(this.filePath, "addAudio");
    } else {
      var postData = {
        "group_id": this.retrievedGroupDetails['_id'],
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
        this.groupService.createGroupPost(postData).subscribe((data: any) => {
          console.log(data);
          if (data['statusCode'] === 200) {
            this.feedForm.controls.postTxt.setValue("");
            this.spinner.hide();
            this.submitted = false;
            this.toastr.success("Post added successfully");
            this.groupPostListComponent.getAllGroupFeeds();
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

  async postGroupFiles(postData: any) {
    this.spinner.show();
    console.log(postData);
    this.groupService.createGroupPost(postData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.isAddImage = false;
        this.isAddVideo = false;
        this.isAddAudio = false;
        this.feedForm.reset();
        this.selectedFiles = [];
        this.filePath = [];
        this.spinner.hide();
        this.submitted = false;
        this.toastr.success("Post added successfully");
        this.groupPostListComponent.getAllGroupFeeds();
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
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        const file = event.target.files[i];
        this.selectedFiles.push(file);
        console.log('selected file name', file.name);
        this.filePath.push(Math.random() * 10000000000000000 + '_' + file.name);
        reader.readAsDataURL(file);
        reader.onload = () => {
          console.log("imgSrc", reader.result as string);
          this.imageSrc.push({ type: fileType, value: reader.result as string });
        }
      }

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
    let today = new Date();
    const file = this.selectedFiles;
    let res: any = await this.uploadService.uploadFile(file, filePath);
    console.log(res);
    if (!this.retrievedGroupDetails) {
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
          "thumbnail": res['Location'],
          "scheduled": false,
          "scheduledDateTime": today.toISOString()
        }

        this.postFiles(sendData);
      } else if (jsonKey === "addVideo") {
        let sendData = {
          "title": this.f.postTxt.value,
          "type": "video",
          "fileName": res['Location'],
          "thumbnail": res['Location'],
          "duration": this.duration,
          "scheduled": false,
          "scheduledDateTime": today.toISOString()
        }

        this.postFiles(sendData);
      } else if (jsonKey === "addAudio") {
        let sendData = {
          "title": this.f.postTxt.value,
          "type": "audio",
          "fileName": res['Location'],
          "thumbnail": res['Location'],
          "duration": this.duration,
          "scheduled": false,
          "scheduledDateTime": today.toISOString()
        }

        this.postFiles(sendData);
      }
    } else {
      if (jsonKey === "addImage") {
        let sendData = {
          "group_id": this.retrievedGroupDetails['_id'],
          "title": this.f.postTxt.value,
          "type": "image",
          "fileName": res['Location'],
          "thumbnail": res['Location']
        }

        this.postGroupFiles(sendData);
      } else if (jsonKey === "addVideo") {
        let sendData = {
          "group_id": this.retrievedGroupDetails['_id'],
          "title": this.f.postTxt.value,
          "type": "video",
          "fileName": res['Location'],
          "thumbnail": res['Location'],
          "duration": this.duration
        }

        this.postGroupFiles(sendData);
      } else if (jsonKey === "addAudio") {
        let sendData = {
          "group_id": this.retrievedGroupDetails['_id'],
          "title": this.f.postTxt.value,
          "type": "audio",
          "fileName": res['Location'],
          "thumbnail": res['Location'],
          "duration": this.duration
        }

        this.postGroupFiles(sendData);
      }
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

  removeAttachment(imgIndex: number) {
    // const selectedIndex = this.selectedFiles.indexOf(imgIndex); 
    console.log('removeAttachment - imgIndex', imgIndex);
    this.imageSrc.splice(imgIndex, 1);
    console.log("removeAttachment, selected files", this.selectedFiles);
    // this.selectedFiles.splice(imgIndex, 1);
    this.filePath.splice(imgIndex, 1);
    // this.isAddImage = false;    
  }

  createPoll() {
    if (this.router.url === "/group-detail-new") {
      this.router.navigate([this.routernavigate.poll], { queryParams: { type: 'group' } });
    } else {
      this.router.navigate([this.routernavigate.poll]);
    }
  }

  /**
   * araki dev function
   * @param opt_num 
   */
  selectPostOption(opt_num: number) {
    this.homeComponent.postOption = opt_num;
  }

}
