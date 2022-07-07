import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, IterableDiffers, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../../services/profile.service';
import { PostService } from '../../../../services/post.service';
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
import { SharedState } from 'src/app/sharedState/sharedState';

declare var swal: any;
declare var $: any;
@Component({
  selector: 'app-post-list',
  templateUrl: '../pages/post-list.component.html',
  styleUrls: ['../pages/post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent implements OnInit {

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

  postType: any = "all";
  filterType: string = "";

  filterPostDateWise: any = "all";
  filterPost: any = "latest";
  orderBy: any = "desc";

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private postService: PostService,
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
    private iterableDiffers: IterableDiffers,
    private filterState: SharedState,    
  ) { }

  ngOnInit(): void {
    this.filterType  = this.filterState.typeOfPost;
    console.log('pipe value', this.filterType);
    let retrievedObject: any = localStorage.getItem('userData');
    if (retrievedObject) {
      this.userJsonData = JSON.parse(retrievedObject);
      // console.log(this.userJsonData);
      // console.log(localStorage.getItem('accessToken'));
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
    // console.log(this.router.url);
    if (this.router.url === "/profile") {
      this.isMyProfilePage = true;
      this.getUserFeeds(this.postType);
    } else if (this.router.url === "/bookmark") {
      this.isMyProfilePage = false;
      this.isBookmarkPage = true;
      this.getBookmark("all");
    } else {
      this.isMyProfilePage = false;
      this.getAllFeeds(this.filterPostDateWise, this.filterPost, this.orderBy);
    }
  }

  getPostsFromAnother(){
    this.getAllFeeds(this.filterPostDateWise, this.filterPost, this.orderBy);
  }

  getAllFeeds(filterPostDateWise: any, filterPost: any, orderBy: any) {
    this.spinner.show();
    this.filterPostDateWise = filterPostDateWise;
    this.filterPost = filterPost;
    this.orderBy = orderBy;

    var pagination = {
      "pageNumber": this.page,
      "type": "all",
      "filter": filterPostDateWise,
      "sort": orderBy,
      "filterposts": filterPost
    }

    // console.log(pagination);

    this.postService.getGlobalFeed(pagination).subscribe((data: any) => {
      // console.log(data);
      if (data['statusCode'] === 200) {
        if (data['postData'].length) {
          if (this.page === 0) {
            this.totalPosts = data['postData'].length;
            this.userPosts = data['postData'];
            this.cdr.detectChanges();
            console.log('getGlobalFeed',this.userPosts);
          } else {
            this.userPosts = [...this.userPosts, ...data['postData']];
            this.totalPosts = data['postData'].length;
          }
        } else {
          this.totalPosts = data['postData'].length;
        }
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error(data['message']);
      }
    }, (error) => {
      this.spinner.hide();
      // console.log(error['error']['message']);
      this.toastr.error(error['error']['message']);
    });
  }


  getUserFeeds(type: any) {
    var pagination = {
      "pageNumber":this.page,
      "type": type,
      "filter":"",
      "sort":"",
      "filterposts":"mostliked"   
    }
    
    this.spinner.show();
    this.postType = type;
    this.filterType = this.filterState.typeOfPost; 
    console.log('getUserFeeds', this.filterType)   ;
    this.postService.getUserFeed(pagination).subscribe((data: any) => {
      console.log(data);
        if (data['statusCode'] === 200) {
        this.totalPosts = data['postData'].length;        
        // this.userPosts = [...data['postData']];
        this.userPosts = data['postData'];
        this.cdr.detectChanges();
        this.cdr.markForCheck();
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

  getBookmark(type: any) {
    if (this.pageNumber === 0) {
      this.spinner.show();
    }

    let page = {
      "pageNumber": this.pageNumber,
      "type": type
    }

    this.bookmarkService.getBookmark(page).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        if (data['bookmarksData'].length != 0) {
          if (this.pageNumber === 0) {
            this.totalPosts = data['bookmarksData'].length;
            this.userPosts = data['bookmarksData'];
            this.cdr.detectChanges();
          } else {
            this.userPosts = [...this.userPosts, ...data['bookmarksData']];
            this.totalPosts = data['bookmarksData'].length;
          }
        } else {
          this.totalPosts = data['bookmarksData'].length;
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

  bookmarkFilter(types: any) {
    this.userPosts = this.userPosts.filter((res: { [x: string]: string; }) => {
      return res['_id'];
    });
    this.totalPosts = this.userPosts.length;
    let filterArr: any = [];
    for (let i = 0; i < this.userPosts.length; i++) {
      if (this.userPosts[i]['postDetail']['type'] === types) {
        filterArr.push(this.userPosts[i]);
      }
    }
    this.userPosts = [] = filterArr;
    console.log(this.userPosts);
  }

  favoritePost(Id: any, postId: any, status: any, totalLikes: any) {
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

  bookmartPost(Id: any, postId: any, status: any) {
    console.log(Id);
    console.log(status);
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

    console.log(postValue);

    this.postService.postBookmark(postValue).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {

        if (className === "bookmark") {
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
      "_id": Id
    }
    console.log(postData);

    this.postService.deletePost(postData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.spinner.hide();
        this.toastr.success(data['message']);
        if (this.router.url === "/profile") {
          this.isMyProfilePage = true;
          this.getUserFeeds(this.postType);
        } else {
          this.isMyProfilePage = false;
          this.getAllFeeds(this.filterPostDateWise, this.filterPost, this.orderBy);
        }
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

    this.postService.deleteComment(commentData).subscribe((data: any) => {
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

  editCommentTxt(commentId: any, commentText: any, postId: any, commentBoxId: any) {
    (<HTMLInputElement>document.getElementById(commentBoxId)).value = commentText;
    this.editCommentId = commentId;
    this.editCommentPostId = postId;
  }

  submitPollAnswer(postId: any, pollAnswer: any, pollOptionId: any, pollAnswerId: any, pollOptionData: any, pollOptionAnswerId: any, totalVoted: any) {
    console.log(postId);
    console.log(pollAnswer);
    console.log(pollOptionId);
    console.log(pollAnswerId);
    console.log("total voted: " + totalVoted);

    let pollVotingReq = {
      "postid": postId,
      "optionid": pollOptionAnswerId
    }

    console.log(pollVotingReq);

    this.postService.pollVoting(pollVotingReq).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
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

    let divPollOptionId = document.getElementById(pollOptionId)!;
    let divPollAnswerId = document.getElementById(pollAnswerId)!;

    let totalVotes: number = totalVoted + 1;
    // for (let i = 0; i < pollOptionData.length; i++) {
    //   totalVotes = totalVotes + Number(pollOptionData[i].choose);
    //   console.log(pollOptionData[i].choose);
    // }

    console.log(totalVotes);

    for (let i = 0; i < pollOptionData.length; i++) {
      let paid = document.getElementById(pollOptionData[i]._id + 'paid')!;
      if (totalVotes === 0) {
        paid.style.width! = '0%';
      } else {
        if (pollOptionAnswerId === pollOptionData[i]._id) {
          paid.style.width! = (Number(pollOptionData[i].choose + 1) / totalVotes * 100).toFixed(2) + '%';
          console.log((Number(pollOptionData[i].choose + 1) / totalVotes * 100));
        } else {
          paid.style.width! = (Number(pollOptionData[i].choose) / totalVotes * 100).toFixed(2) + '%';
          console.log((Number(pollOptionData[i].choose) / totalVotes * 100));
        }
      }
    }

    divPollOptionId.style.display! = 'none';
    divPollAnswerId.style.display! = '';
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
      if (num === 0 || num === 1) {
        return num + ' vote'; // if value < 1000, nothing to do
      } else {
        return num + ' votes'; // if value < 1000, nothing to do
      }
    }

    return;
  }

  pollVoted(postId: any, pollOptionId: any, pollAnswerId: any, pollOptionData: any, pollVotingData: any) {
    let divPollOptionId = document.getElementById(pollOptionId)!;
    let divPollAnswerId = document.getElementById(pollAnswerId)!;

    let totalVotes: number = pollVotingData.length;

    for (let j = 0; j < pollVotingData.length; j++) {
      if (this.userId === pollVotingData[j]['user']) {
        divPollOptionId.style.display! = 'none';
        divPollAnswerId.style.display! = '';
        for (let i = 0; i < pollOptionData.length; i++) {

          if (pollVotingData[j].optionid === pollOptionData[i]._id) {
            let id = pollOptionData[i]._id + 'paid';
            let paid = document.getElementById(id)!;
            console.log(paid);
            paid.style.width! = (Number(pollOptionData[i].choose + 1) / totalVotes * 100).toFixed(2) + '%';
            console.log((Number(pollOptionData[i].choose + 1) / totalVotes * 100));
            return 'none';
          }
        }

        break;
      }
    }
    return 'none';
  }

  deleteBookmark(Id: any) {
    let postData = {
      "_id": Id
    }
    console.log(postData);

    this.bookmarkService.deleteBookmark(postData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.spinner.hide();
        this.toastr.success(data['message']);
        this.getBookmark(this.postType);
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

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached()) {
      if (this.isMyProfilePage === false) {
        if (this.isBookmarkPage === true) {
          if (this.totalPosts != 0) {
            this.pageNumber += 1;
            this.getBookmark(this.postType);
          }
        } else {
          if (this.totalPosts != 0) {
            this.page += 1;
            this.getAllFeeds(this.filterPostDateWise, this.filterPost, this.orderBy);
          }
        }
        // console.log(this.page);
      }
    }
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  numFormatter(num: any) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K likes this'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M likes this'; // convert to M for number from > 1 million 
    } else if (num < 900) {
      return num + ' likes this'; // if value < 1000, nothing to do
    } else {
      return num + ' likes this';
    }
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

  checkFavoritePost(favoriteData: any) {
    var isPresent = favoriteData.some((el: any) => { return el.user === this.userId });
    return isPresent;
  }

  checkBookmarkPost(bookmarkData: any) {
    var isPresent = bookmarkData.some((el: any) => { return el.user === this.userId });
    return isPresent;
  }

  viewProfile(userName: any) {
    this.router.navigate([userName]);
  }
}
