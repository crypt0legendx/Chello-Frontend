import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
  bookmarkList: any = [];
  totalBookmark: any;

  category:string = "All Bookmarks";
  interval:string = "alltime";
  filterMethod: string = "latest";
  sort: string = "desc";

  pageNumber: number = 0;
  scrollEnabled:boolean = true;

  //comments
  lastPostCommentId: any;
  postComment: any;
  isPostComment: boolean = false;

  editCommentId: any;
  editCommentPostId: any;

  userId: any;

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
      this.userId = this.userJsonData['_id'];
      console.log(this.userJsonData);
    }

    this.getBookmarks();
  }

  getBookmarkList(){
    return this.bookmarkList;
  }

  getBookmarks() {
    this.spinner.show();
    let paramData = {
      "pageNumber": this.pageNumber,
      "type":this.category,
      "filter": this.interval,
      "sort":this.sort,
      "filterposts": this.filterMethod
    }

    console.log(paramData);
    
    this.bookmarkService.getBookmark(paramData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.totalBookmark = data['bookmarksData'].length;
        this.bookmarkList = this.bookmarkList.concat(data['bookmarksData']);
        if(this.totalBookmark<10){
          this.scrollEnabled = false;
        }
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

  reloadBookmarks(){
    this.bookmarkList = [];
    this.pageNumber = 0;
    this.scrollEnabled = true;
    this.getBookmarks();
  }

  setCategory(cat:string){
    this.category = cat;
    this.reloadBookmarks();
  }

  setFilterOptions(opt:string, value:string){
    if(opt == "interval"){
      this.interval = value;
    }
    if(opt == "filterMethod"){
      this.filterMethod = value;
    }
    if(opt == "sort"){
      this.sort = value;
    }
    this.reloadBookmarks();
  }

  favoritePost(Id: any, postId: any, status: any) {
    console.log(Id);
    console.log(status);
    const myElement = document.getElementById(Id)!;
    console.log(myElement.className);

    this.spinner.show();
    let className = document.getElementById(Id)!.className;

    if (className === "favorite") {
      status = 1;
    }
    else {
      status = 0;
    }

    let postValue = {
      "postid": postId,
      "status": status
    }

    console.log(postValue);

    this.postService.postFavorite(postValue).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {

        if (className === "favorite") {
          document.getElementById(Id)!.classList.add('active');
          let likesCount = document.getElementById('likecounter'+postId)!.textContent;
          let likes: any = likesCount!.replace(/ .*/,'');
          document.getElementById('likecounter'+postId)!.innerHTML = (Number(likes) + 1) + " likes this";
        }
        else {
          document.getElementById(Id)!.classList.remove('active');
          let likesCount = document.getElementById('likecounter'+postId)!.textContent;
          let likes: any = likesCount!.replace(/ .*/,'');
          document.getElementById('likecounter'+postId)!.innerHTML = (Number(likes) - 1) + " likes this";
        }

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

  async getComment(postId: any, commentId: any) {

    if (this.lastPostCommentId) {
      if (this.lastPostCommentId != commentId) {
        let lastSrcElement = document.getElementById(this.lastPostCommentId);
        if (lastSrcElement != null) {
          lastSrcElement.style.display = 'none';
        }
        this.lastPostCommentId = commentId;
      }
    } else {
      this.lastPostCommentId = commentId;
    }


    let commentData = {
      "postid": postId,
    }

    this.postService.getComment(commentData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        if (data['commentData'].length != 0) {
          console.log("Comment If");
          // for (var i = 0; i < data['commentData'].length; i++) {
          //   let profileUrl = data['commentData'][i]['tags']; //onclick="Window.myComponent.demo($1)" //"'+''+'"

          //   data['commentData'][i].description = this.sanitized.bypassSecurityTrustHtml(data['commentData'][i].description.replace(/@([a-z\d_]+)/ig, '<a onclick="Window.myComponent.checkCommentUsername(\'$1\')" style="color: #1e418de6;font-weight: bold;cursor: pointer;">@$1</a>'));
          // }
          this.postComment = data['commentData'];
          console.log(this.postComment);
          this.isPostComment = true;
          this.spinner.hide();

          var srcElement = document.getElementById(commentId);
          if (srcElement != null) {
            if (srcElement.style.display == "block") {
              srcElement.style.display = 'none';
            }
            else {
              srcElement.style.display = 'block';
            }
          }
        } else {
          this.isPostComment = false;
          var srcElement = document.getElementById(commentId);
          if (srcElement != null) {
            if (srcElement.style.display == "block") {
              srcElement.style.display = 'none';
            }
            else {
              srcElement.style.display = 'block';
            }
          }
          this.spinner.hide();
          console.log("Comment Else");
        }
      }
      else {
        this.isPostComment = false;
        this.spinner.hide();
        this.toastr.error(data['message']);
      }
    }, (error) => {
      this.isPostComment = false;
      this.spinner.hide();
      this.toastr.error(error['message']);
    });
  }

  async addComment(commentText: any, postId: any, commentTxtId: any) {
    console.log(commentText.value);

    if (this.editCommentId) {
      let commentValue = {
        "_id": this.editCommentId,
        "postid": postId,
        "comment": commentText.value
      }

      console.log(commentValue);

      this.postService.editComment(commentValue).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          this.editCommentId = "";
          this.editCommentPostId = "";
          (<HTMLInputElement>document.getElementById(commentTxtId)).value = "";
          this.spinner.hide();
          this.reloadBookmarks();
        }
        else {
          this.spinner.hide();
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        this.toastr.error(error['error']['message']);
      });
    } else {
      let commentValue = {
        "postid": postId,
        "comment": commentText.value
      }

      console.log(commentValue);

      this.postService.postComment(commentValue).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          (<HTMLInputElement>document.getElementById(commentTxtId)).value = "";
          this.spinner.hide();
          this.reloadBookmarks();
        }
        else {
          this.spinner.hide();
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        this.toastr.error(error['error']['message']);
      });
    }

  }

  deleteComment(Id: any, postId: any) {
    let commentData = {
      "_id": Id
    }
    console.log(commentData);

    this.postService.deleteComment(commentData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        let commentDivId = document.getElementById(Id)!;
        commentDivId.style.display = 'none';
        this.spinner.hide();
        this.toastr.success(data['message']);
        this.reloadBookmarks();
      }
      else {
        this.spinner.hide();
        this.toastr.error(data['message']);
      }
    }, (error) => {
      this.spinner.hide();
      console.log(error);
      this.toastr.error(error['error']['message']);
    });
  }

  editCommentTxt(commentId: any, commentText: any, postId: any, commentBoxId: any) {
    (<HTMLInputElement>document.getElementById(commentBoxId)).value = commentText;
    this.editCommentId = commentId;
    this.editCommentPostId = postId;
  }

  
  bookmartPost(Id: any, postId: any, status: any) {
    
    const myElement = document.getElementById(Id)!;
    console.log(myElement.className);

    this.spinner.show();
    let className = document.getElementById(Id)!.className;
    if (className === "bookmark") {
      status = 1;
    }
    else {
      status = 0;
    }

    let postValue = {
      "postid": postId,
      "status": status
    }

    this.postService.postBookmark(postValue).subscribe((data: any) => {
      if (data['statusCode'] === 200) {
        if (className === "bookmark") {
          document.getElementById(Id)!.classList.add('active');
        } else {
          document.getElementById(Id)!.classList.remove('active');
        }
        this.spinner.hide();
        this.reloadBookmarks();
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

  openSendTipModal(postId: any) {
    $("#sendTipModal").modal('show');
  }

  tipPayment() {
    $("#sendTipModal").modal('hide');
    // $("#tipPaymentModal").modal('show');
  }

  makePayment() {
    $("#tipPaymentModal").modal('hide');
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50);
  }

  @HostListener("window:scroll", [])
  onScroll(): void {    
    if (this.bottomReached()) {
      if(this.scrollEnabled){      
        this.pageNumber = this.pageNumber+1;
        this.getBookmarks();
      }
    }
  }

}
