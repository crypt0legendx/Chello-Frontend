import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { PostService } from '../../../services/post.service';
import { UploadService } from '../../../services/upload.service';
import { UserService } from '../../../services/user.service';
import { BookmarkService } from '../../../services/bookmark.service';
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

@Component({
  selector: 'app-bookmark',
  templateUrl: '../pages/bookmark.component.html',
  styleUrls: ['../pages/bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {
  @ViewChild(PostListComponent ) postListCmp: PostListComponent | undefined ; 
  userJsonData: any;
  bookmarkList: any;
  totalBookmark: any;
  pageNumber: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private bookmarkService: BookmarkService,
    private uploadService: UploadService,
    private userService: UserService,
    private postService: PostService,
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
    }

    //this.getBookmarks();
  }

  getBookmarks() {
    this.spinner.show();
    let page = {
      "pageNumber": this.pageNumber
    }
    
    this.bookmarkService.getBookmark(page).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.totalBookmark = data['bookmarksData'].length;
        this.bookmarkList = data['bookmarksData'];

        console.log(this.bookmarkList);

        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error(data['message']);
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error['error']['message']);
    });
  }

  postFilter(type: any){
    if(type === "all"){
      this.postListCmp?.getBookmark();
    } else{
      this.postListCmp?.bookmarkFilter(type);
    }
  }

}
