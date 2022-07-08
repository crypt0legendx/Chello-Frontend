import { ChangeDetectorRef, Component, HostListener, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../../services/profile.service';
import { PostService } from '../../../../services/post.service';
import { GroupService } from '../../../../services/group.service';
import { BookmarkService } from '../../../../services/bookmark.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { routers } from '../../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { DomSanitizer } from '@angular/platform-browser';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-group-post-list',
  templateUrl: '../pages/group-post-list.component.html',
  styleUrls: ['../pages/group-post-list.component.scss']
})
export class GroupPostListComponent implements OnInit, OnChanges {

  isShown: boolean = false; // hidden by default
  totalPosts: any;
  userPosts: any = [];

  userName: any;
  profilePicture: any;
  isUserVerify: any;
  userFullName: any;
  userCoverPicture: any;
  isUserCoverPicture: boolean = false;
  userJsonData: any;
  userId: any;

  lastPostCommentId: any;
  postComment: any;
  isPostComment: boolean = false;

  isMyProfilePage: boolean = false;
  isBookmarkPage: boolean = false;
  page: number = 0;

  editCommentId: any;
  editCommentPostId: any;
  pageNumber: number = 0;

  bookmarkList: any;
  totalBookmark: any;
  retrievedGroupDetails: any;

  groupId: any;

  @Input() someInput: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private postService: PostService,
    private groupService: GroupService,
    private bookmarkService: BookmarkService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private sanitized: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes");
    this.getAllGroupFeeds();
  }

  ngOnInit(): void {
    let retrievedObject: any = localStorage.getItem('userData');
    if (retrievedObject) {
      this.userJsonData = JSON.parse(retrievedObject);
      console.log(this.userJsonData);
      console.log(localStorage.getItem('accessToken'));
      this.userName = this.userJsonData['userName'];
      this.userId = this.userJsonData['_id'];
      this.profilePicture = this.userJsonData['profileImage'];
      this.isUserVerify = this.userJsonData['profileStatus'];
      this.userFullName = this.userJsonData['fullName'];
      this.userCoverPicture = this.userJsonData['coverImage'];
      if (this.userJsonData['coverImage']) {
        this.isUserCoverPicture = true;
      } else {
        this.isUserCoverPicture = false;
      }
    }

    this.retrievedGroupDetails = localStorage.getItem('groupDetails');
    this.retrievedGroupDetails = JSON.parse(this.retrievedGroupDetails)
    this.groupId = this.retrievedGroupDetails['_id'];
    this.getAllGroupFeeds();
  }

  async getAllGroupFeeds() {
    this.retrievedGroupDetails = localStorage.getItem('groupDetails');
    this.retrievedGroupDetails = JSON.parse(this.retrievedGroupDetails)

    this.spinner.show();
    var pagination = {
      "group_id": this.retrievedGroupDetails['_id'],
      "pageNumber": this.page
    }

    console.log(pagination);

    this.groupService.getGroupPost(pagination).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        if(data['groupData'].length)
        {
          if (this.page === 0) {
            this.totalPosts = data['groupData'].length;
            this.userPosts = data['groupData'];
            this.cdr.detectChanges();
            console.log(this.userPosts);
          } else {
            this.userPosts = [...this.userPosts, ...data['groupData']];
            this.totalPosts = data['groupData'].length;
          }
        }
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error(data['message']);
      }
    }, (error) => {
      this.spinner.hide();
      console.log(error['error']['message']);
      this.toastr.error(error['error']['message']);
    });
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
      "groupid": postId,
      "status": status
    }

    console.log(postValue);

    this.groupService.postFavorite(postValue).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {

        if (className === "favorite") {
          document.getElementById(Id)!.classList.add('active');
        }
        else {
          document.getElementById(Id)!.classList.remove('active');
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
      "groupid": postId,
    }

    this.groupService.getComment(commentData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        if (data['commentData'].length != 0) {
          console.log("Comment If");
          // for (var i = 0; i < data['commentData'].length; i++) {
          //   let profileUrl = data['commentData'][i]['tags']; //onclick="Window.myComponent.demo($1)" //"'+''+'"

          //   data['commentData'][i].description = this.sanitized.bypassSecurityTrustHtml(data['commentData'][i].description.replace(/@([a-z\d_]+)/ig, '<a onclick="Window.myComponent.checkCommentUsername(\'$1\')" style="color: #1e418de6;font-weight: bold;cursor: pointer;">@$1</a>'));
          // }
          this.postComment = data['commentData'];
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

    if(this.editCommentId){
      let commentValue = {
        "_id": this.editCommentId,
        "groupid": postId,
        "comment": commentText.value
      }
  
      console.log(commentValue);
  
      this.groupService.editComment(commentValue).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          this.editCommentId = "";
          this.editCommentPostId = "";
          (<HTMLInputElement>document.getElementById(commentTxtId)).value = "";
          this.spinner.hide();
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
        "groupid": postId,
        "comment": commentText.value
      }
  
      console.log(commentValue);
  
      this.groupService.postComment(commentValue).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          (<HTMLInputElement>document.getElementById(commentTxtId)).value = "";
          this.spinner.hide();
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

  deletePost(Id: any) {
    let postData = {
      "post_id": Id
    }
    console.log(postData);

    this.groupService.deleteGroupPost(postData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.spinner.hide();
        this.toastr.success(data['message']);
        this.getAllGroupFeeds();
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

  deleteComment(Id: any, postId: any) {
    let commentData = {
      "_id": Id
    }
    console.log(commentData);

    this.groupService.deleteComment(commentData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        let commentDivId = document.getElementById(Id)!;
        commentDivId.style.display = 'none';
        this.spinner.hide();
        this.toastr.success(data['message']);
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

  editCommentTxt(commentId: any, commentText: any, postId: any, commentBoxId: any){
    (<HTMLInputElement>document.getElementById(commentBoxId)).value = commentText;
    this.editCommentId = commentId;
    this.editCommentPostId = postId;
  }

  submitPollAnswer(Id: any, pollAnswer: any, pollOptionId: any, pollAnswerId: any, pollOptionData: any) {
    console.log(Id);
    console.log(pollAnswer);
    console.log(pollOptionId);
    console.log(pollAnswerId);

    let divPollOptionId = document.getElementById(pollOptionId)!;
    let divPollAnswerId = document.getElementById(pollAnswerId)!;

    let totalVotes: number = 0;
    for (let i = 0; i < pollOptionData.length; i++) {
      totalVotes = totalVotes + Number(pollOptionData[i].choose);
      console.log(pollOptionData[i].choose);
    }

    console.log(totalVotes);

    for (let i = 0; i < pollOptionData.length; i++) {
      let paid = document.getElementById(pollOptionData[i]._id + 'paid')!;
      if (totalVotes === 0) {
        paid.style.width! = '0%';
      } else {
        paid.style.width! = (Number(pollOptionData[i].choose) / totalVotes * 100).toFixed(2) + '%';
        console.log((Number(pollOptionData[i].choose) / totalVotes * 100));
      }
    }

    divPollOptionId.style.display! = 'none';
    divPollAnswerId.style.display! = '';
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached()) {
      if(this.totalPosts != 0){
        this.page+=1;
        this.getAllGroupFeeds();
      }
    }
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  checkFavoritePost(favoriteData: any) {
    var isPresent = favoriteData.some((el: any) => { return el.user === this.userId });
    return isPresent;
  }

  checkBookmarkPost(bookmarkData: any) {
    var isPresent = bookmarkData.some((el: any) => { return el.user === this.userId });
    return isPresent;
  }

  numFormatter(num: any) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

  pollDuration(duration: any, createdAt: any) {
    let date1: any = new Date(createdAt);
    let date2: any = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //console.log(diffTime + " milliseconds");
    //console.log(diffDays + " days");

    if (duration >= diffDays) {
      return ''
    }

    return 'none'
  }

  pollDayLeft(duration: any, createdAt: any) {
    let date1: any = new Date(createdAt);
    let date2: any = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //console.log(diffTime + " milliseconds");
    //console.log(diffDays + " days");

    if ((duration - diffDays) === 0) {
      return '1 Day'
    }

    return (duration - diffDays) + " Days"
  }

  pollVotes(num: any) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K votes'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M votes'; // convert to M for number from > 1 million 
    } else if (num < 900) {
      if(num === 0 || num === 1){
        return num + ' vote'; // if value < 1000, nothing to do
      } else{
        return num + ' votes'; // if value < 1000, nothing to do
      }
    }

    return;
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
}
