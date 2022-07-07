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
  showMessageTwo: boolean = false;
  users: any = [];
  chats: any = [];
  chatArray:any = [];
  showWelcome: boolean = true;
  fullName: String = "";
  date: any;
  inputMessage: any;
  message: any;
  isTrue: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private postService: PostService,
    private bookmarkService: BookmarkService,
    private spinner: NgxSpinnerService,
    // private toastr: ToastrService,
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

    this.userList();
    }

    userList() {
      this.chats = [];
      this.users = [];
    const queryChat = this.afs.collection('chats').ref.where("users", "array-contains", this.userId)
    const queryUsers = this.afs.collection('users')
    queryChat.get().then(data => {
      data.forEach(el => {
        this.chats.push(el.data())
      })
      queryUsers.get().subscribe(data => {
        data.forEach(el => {
          this.users.push(el.data())
        })
        this.chats.forEach((el: any) => {
          let secondUser: any = []
          el.users.forEach((ele: any) => {
            if (ele !== this.userId) {
              secondUser = this.users.filter((element: any) => element.user_id === ele)
            }
          });
          el['talkingTo'] = secondUser[0]
          let formatDate = new Date(el.lastMessageSent['seconds'] * 1000)
          el['formatlastDate'] = formatDate
        });
      });
    });
  }

  messageTwo() {
    this.showMessageTwo = true;
  }

  openParticularChat(param: any) {
    this.inputMessage = param;
    this.chatArray = [];
    this.date = param.formatlastDate;
    this.fullName = param.talkingTo.fullName;
    this.afs.collection("chats").doc(param.chatId).collection("messages").get().subscribe(data => {
    data.forEach(el => {
        this.chatArray.push(el.data())
      })
    })  
    this.showWelcome = false
  }

  messageSent() {
    this.userList();
    this.showMessageTwo = false
  }

   async sendMessage(){
    const resp = await this.afs.collection("chats").doc(this.inputMessage.chatId).collection("messages").add({
      message: this.message,
      });

      const payload = {
        message: this.message,
        messageBy: {user_id: this.userId, name: this.userJsonData.fullName},
        messageId:  resp.id,
        messageTo: {
          name: this.inputMessage.talkingTo.fullName,
          user_id: this.inputMessage.talkingTo.user_id
        }
      }
      this.chatArray.push(payload)

     await this.afs.collection("chats").doc(this.inputMessage.chatId).collection("messages").doc(resp.id).update({
      messageId: resp.id,
      messageBy: {
        name: this.userJsonData.fullName,
        userId: this.userId
      },
      messageTo: {
        name: this.inputMessage.talkingTo.fullName,
        user_id: this.inputMessage.talkingTo.user_id
      }
    });
    
     await this.afs.collection("chats").doc(this.inputMessage.chatId).update({
      lastMessage: this.message,
      lastMessageSent: new Date()
    });
    this.message = "";
    this.userList();
  }
}
