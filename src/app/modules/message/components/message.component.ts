import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, IterableDiffers, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { PostService } from '../../../services/post.service';
import { BookmarkService } from '../../../services/bookmark.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { routers } from '../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { DomSanitizer } from '@angular/platform-browser';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-message',
  templateUrl: '../pages/message.component.html',
  styleUrls: ['../pages/message.component.scss']
})
export class MessageComponent implements OnInit {

  userName: any;
  profilePicture: any;
  isUserVerify: any;
  userFullName: any;
  userCoverPicture: any;
  isUserCoverPicture: boolean = false;
  userJsonData: any;
  userId: any;

  postsCol: AngularFirestoreCollection<any> | undefined;
  posts: Observable<any> | undefined;

  getCurrentUser: Object | undefined;
  getMessageUserList: Object | undefined;
  getUserMessages: Object | undefined;
  getMessageUserListOriginal: Object | undefined;

  conversationId: any;
  receiverId: any;
  sendTextMsg: any = "";
  sendTextMsgCopy: any = "";
  receiverAcronym: any;
  noMessage: boolean = false;
  isMessageListFound: boolean = false;

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
    private iterableDiffers: IterableDiffers
  ) { }

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

    this.getChatList();
  }

  getChatList() {
    this.postsCol = this.afs.collection('users', ref => ref.where('user_id', '==', this.userId));
    this.posts = this.postsCol.valueChanges();

    let sub = this.posts.subscribe(res => {
      console.log(res);
      this.getCurrentUser = res[0];
      let subb = this.afs.collection('users').doc("" + res[0]['user_id'] + "").collection('chats').valueChanges().subscribe(data => {
        console.log(data);
        if (data.length > 0) {
          this.isMessageListFound = true;
          let msgListData = [];
          for (let i = 0; i < data.length; i++) {
            //console.log("Message : " +data[i]['firstName']);
            var chatUserName = data[i]['username'];
            var matches = chatUserName.match(/\b(\w)/g);
            var acronym = matches.join('');

            let profilePictureName = {
              "profile_picture_name": acronym,
              "chatUserName": data[i]['username'],
              "isGroup": false,
              "profileImage": data[i]['profileImage']
            };

            msgListData.push(Object.assign({}, data[i], profilePictureName));


          }
          this.getMessageUserList = msgListData;
          this.getMessageUserListOriginal = msgListData;
          console.log(this.getMessageUserList);
          this.spinner.hide();

          subb.unsubscribe();
          sub.unsubscribe();
        }
        else {
          this.isMessageListFound = false;
          this.spinner.hide();
        }
      });
    });
  }

}
