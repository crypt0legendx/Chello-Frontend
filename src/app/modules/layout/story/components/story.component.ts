import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { PostService } from '../../../../services/post.service';
import { ProfileService } from '../../../../services/profile.service';
import { UploadService } from '../../../../services/upload.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { routers } from '../../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';

declare var swal: any;
declare var $: any;
declare var Zuck: any

@Component({
  selector: 'app-story',
  templateUrl: '../pages/story.component.html',
  styleUrls: ['../pages/story.component.scss']
})
export class StoryComponent implements OnInit {

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
    this.initZuck();
    (window as any).globalApp = this;
  }

  initZuck() {
    var stories = new Zuck('stories', {
      backNative: true,
      previousTap: true,
      skin: "Snapssenger",
      autoFullScreen: false,
      avatars: false,
      paginationArrows: true,
      list: false,
      cubeEffect: true,
      localStorage: true,
      stories: [
        Zuck.buildTimelineItem(
          'ramon',
          'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/users/1.jpg',
          'Ramon',
          'https://ramon.codes',
          this.timestamp(),
          [
            [
              'ramon-1',
              'photo',
              3,
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/1.jpg',
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/1.jpg',
              '',
              false,
              false,
              this.timestamp(),
            ],
            [
              'ramon-2',
              'video',
              0,
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.mp4',
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.jpg',
              '',
              false,
              false,
              this.timestamp(),
            ],
            [
              'ramon-3',
              'photo',
              3,
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/3.png',
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/3.png',
              'https://ramon.codes',
              'Visit my Portfolio',
              false,
              this.timestamp(),
            ],
          ],
        ),
        Zuck.buildTimelineItem(
          'gorillaz',
          'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/users/2.jpg',
          'Gorillaz',
          '',
          this.timestamp(),
          [
            [
              'gorillaz-1',
              'video',
              0,
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/4.mp4',
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/4.jpg',
              '',
              false,
              false,
              this.timestamp(),
            ],
            [
              'gorillaz-2',
              'photo',
              3,
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/5.jpg',
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/5.jpg',
              '',
              false,
              false,
              this.timestamp(),
            ],
          ],
        ),
        Zuck.buildTimelineItem(
          'ladygaga',
          'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/users/3.jpg',
          'Lady Gaga',
          '',
          this.timestamp(),
          [
            [
              'ladygaga-1',
              'photo',
              5,
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg',
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg',
              '',
              false,
              false,
              this.timestamp(),
            ],
            [
              'ladygaga-2',
              'photo',
              3,
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/7.jpg',
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/7.jpg',
              'http://ladygaga.com',
              false,
              false,
              this.timestamp(),
            ],
          ],
        ),
        Zuck.buildTimelineItem(
          'starboy',
          'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/users/4.jpg',
          'The Weeknd',
          '',
          this.timestamp(),
          [
            [
              'starboy-1',
              'photo',
              5,
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg',
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg',
              '',
              false,
              false,
              this.timestamp(),
            ],
          ],
        ),
        Zuck.buildTimelineItem(
          'riversquomo',
          'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/users/5.jpg',
          'Rivers Cuomo',
          '',
          this.timestamp(),
          [
            [
              'riverscuomo',
              'photo',
              10,
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg',
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg',
              '',
              false,
              false,
              this.timestamp(),
            ],
          ],
        ),
        Zuck.buildTimelineItem(
          'riverscuomon',
          'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/users/5.jpg',
          'Rivers Cuomo',
          '',
          this.timestamp(),
          [
            [
              'riverscuomon',
              'photo',
              7,
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg',
              'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg',
              '',
              false,
              false,
              this.timestamp(),
            ],
          ],
        ),
      ],
      callbacks: {
        onClose(storyId: any, callback: any) {
          $('#zuck-modal').css({
            overflow: '',
            position: '',
            top: '',
            zindex: '999',
          });
          $('html').css({
            overflow: 'auto',
          });
          document.getElementById('zuck-modal')?.classList.add('closed')
          callback() // on close story viewer
        },
        onOpen(storyId: any, callback: any) {
          let scrollPos = $('body').scrollTop();
          $('#zuck-modal').css({
            overflow: 'hidden',
            position: 'fixed',
            top: -scrollPos,
            zIndex: '999',
          });
          $('html').css({
            overflow: 'hidden',
          });
          document.getElementById('zuck-modal')?.classList.remove('closed')
          callback() // on open story viewer
        }
      },
    })
  }

  timestamp() {
    var timeIndex = 0;
    var shifts = [35, 60, 60 * 3, 60 * 60 * 2, 60 * 60 * 25, 60 * 60 * 24 * 4, 60 * 60 * 24 * 10];

    var now: any = new Date();
    var shift = shifts[timeIndex++] || 0;
    var date = new Date(now - shift * 1000);

    return date.getTime() / 1000;
  }


}
