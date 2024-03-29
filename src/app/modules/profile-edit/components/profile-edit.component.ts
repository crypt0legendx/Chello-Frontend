import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { UploadService } from '../../../services/upload.service';
import { UserService } from '../../../services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { routers } from '../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { PostService } from '../../../services/post.service';
import { baseurl } from '../../../utils/base-url';
import { veriables } from '../../../utils/variables';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-profile-edit',
  templateUrl: '../pages/profile-edit.component.html',
  styleUrls: ['../pages/profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  aboutForm!: FormGroup;
  displayNameForm!: FormGroup;
  usernameForm!: FormGroup;
  emailForm!: FormGroup;
  passwordForm!: FormGroup;
  locationForm!: FormGroup;
  websiteForm!: FormGroup;
  instagramForm!: FormGroup;
  tiktokForm!: FormGroup;
  twitterForm!: FormGroup;
  facebookForm!: FormGroup;
  entForm!: FormGroup;
  profileUrlForm!: FormGroup;

  submittedAboutForm: any;
  submittedDisplayNameForm: any;
  submittedUsernameForm: any;
  submittedEmailForm: any;
  submittedPasswordForm: any;
  submittedLocationForm: any;
  submittedWebsiteForm: any;
  submittedInstagramForm: any;
  submittedTiktokForm: any;
  submittedTwitterForm: any;
  submittedFacebookForm: any;
  submittedEntForm: any;
  submittedProfileUrlForm: any;

  userJsonData: any;

  displayName: any;
  username: any;
  userProfilePicture: any;
  public userCoverPicture: any;
  isUserCoverPicture: boolean = false;

  socialMediaLinks: any = [];

  instagramLink: any = "";
  tiktokLink: any = "";
  twitterLink: any = "";
  facebookLink: any = "";
  entLink: any = "";

  instagramId: any = "";
  tiktokId: any = "";
  twitterId: any = "";
  facebookId: any = "";
  entId: any = "";

  profileUrl: any = "";

  selectedFiles: any = '';
  imageSrc: string = '';

  totalPosts: any;
  pageNumber: number = 0;

  cardList: any = [];
  bankAccountList: any = [];
  bankDetail: any = {};
  cardDetail: any = {};

  formattedaddress = " ";
  options = {}

  role: any;

  myLanguage: any = 'English';

  spotifyCode: any;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private uploadService: UploadService,
    private postService: PostService,
    private userService: UserService,
    public baseurl: baseurl,
    public variable: veriables,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }

  ngOnInit(): void {
    this.socialMediaLinks = [
      {
        "name": "instagram",
        "url": "",
        "_id": ""
      },
      {
        "name": "tiktok",
        "url": "",
        "_id": ""
      },
      {
        "name": "twitter",
        "url": "",
        "_id": ""
      },
      {
        "name": "facebook",
        "url": "",
        "_id": ""
      },
      {
        "name": "24ent",
        "url": "",
        "_id": ""
      }
    ]

    let retrievedObject: any = localStorage.getItem('userData');
    if (retrievedObject) {
      this.userJsonData = JSON.parse(retrievedObject);
      console.log(this.userJsonData);
      this.role = this.userJsonData['role'];
      this.userCoverPicture = this.userJsonData['coverImage'];
      if (this.userJsonData['coverImage']) {
        this.isUserCoverPicture = true;
      } else {
        this.isUserCoverPicture = false;
      }
      console.log(this.userCoverPicture);
    } else {
      this.router.navigate([this.routernavigate.login]);
    }

    this.route.queryParams.subscribe(params => {
      this.spotifyCode = params['code'];
      console.log(this.spotifyCode);
      this.getSpotifyAccessToken();
    });

    this.getUser();

    console.log(localStorage.getItem('accessToken'));
    this.displayName = this.userJsonData['fullName'];
    this.username = this.userJsonData['userName'];

    this.aboutForm = this.formBuilder.group({
      about: ['', Validators.required]
    });

    this.displayNameForm = this.formBuilder.group({
      displayName: ['', Validators.required]
    });

    this.usernameForm = this.formBuilder.group({
      username: ['', Validators.required]
    });

    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required]
    });

    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });

    this.locationForm = this.formBuilder.group({
      location: ['', Validators.required]
    });

    this.websiteForm = this.formBuilder.group({
      website: ['', [Validators.required, Validators.pattern(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/)]]
    });

    this.instagramForm = this.formBuilder.group({
      instagram: ['', [Validators.required, Validators.pattern(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/)]]
    });

    this.tiktokForm = this.formBuilder.group({
      tiktok: ['', [Validators.required, Validators.pattern(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/)]]
    });

    this.twitterForm = this.formBuilder.group({
      twitter: ['', [Validators.required, Validators.pattern(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/)]]
    });

    this.facebookForm = this.formBuilder.group({
      facebook: ['', [Validators.required, Validators.pattern(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/)]]
    });

    this.entForm = this.formBuilder.group({
      ent: ['', [Validators.required, Validators.pattern(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/)]]
    });

    this.profileUrlForm = this.formBuilder.group({
      profileUrl: ['', Validators.required]
    });

    this.setEditVales();
    this.fetchCard();
    this.fetchBankAccount();
  }

  getUser() {
    this.userService.currentUser().subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.totalPosts = data['data']['user']['posts'].length;
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

  setEditVales() {
    let retrievedObject: any = localStorage.getItem('userData');
    this.userJsonData = JSON.parse(retrievedObject);
    this.role = this.userJsonData['role'];
    this.displayName = this.userJsonData['fullName'];
    this.username = this.userJsonData['userName'];
    this.profileUrl = "chello.world/" + this.username;
    this.userProfilePicture = this.userJsonData['profileImage'];
    this.userCoverPicture = this.userJsonData['coverImage'];
    if (this.userJsonData['coverImage']) {
      this.isUserCoverPicture = true;
    } else {
      this.isUserCoverPicture = false;
    }
    console.log(this.userCoverPicture);

    this.aboutForm.controls.about.setValue(this.userJsonData['bio']);
    this.displayNameForm.controls.displayName.setValue(this.userJsonData['fullName']);
    this.usernameForm.controls.username.setValue(this.userJsonData['userName']);
    this.emailForm.controls.email.setValue(this.userJsonData['email']);
    this.locationForm.controls.location.setValue(this.userJsonData['location']['name']);
    this.websiteForm.controls.website.setValue(this.userJsonData['website']);
    this.profileUrlForm.controls.profileUrl.setValue(this.profileUrl);

    if (this.userJsonData['socialMediaLinks'].length != 0) {
      console.log("SM Link : " + this.userJsonData['socialMediaLinks'].length);
      for (let i = 0; i < this.userJsonData['socialMediaLinks'].length; i++) {
        if (this.userJsonData['socialMediaLinks'][i]['name'] === "instagram") {
          this.instagramLink = this.userJsonData['socialMediaLinks'][i]['url'];
          this.instagramId = this.userJsonData['socialMediaLinks'][i]['_id'];
          this.instagramForm.controls.instagram.setValue(this.instagramLink);
        } else if (this.userJsonData['socialMediaLinks'][i]['name'] === "tiktok") {
          this.tiktokLink = this.userJsonData['socialMediaLinks'][i]['url'];
          this.tiktokForm.controls.tiktok.setValue(this.tiktokLink);
          this.tiktokId = this.userJsonData['socialMediaLinks'][i]['_id'];
        } else if (this.userJsonData['socialMediaLinks'][i]['name'] === "twitter") {
          this.twitterLink = this.userJsonData['socialMediaLinks'][i]['url'];
          this.twitterForm.controls.twitter.setValue(this.twitterLink);
          this.twitterId = this.userJsonData['socialMediaLinks'][i]['_id'];
        } else if (this.userJsonData['socialMediaLinks'][i]['name'] === "facebook") {
          this.facebookLink = this.userJsonData['socialMediaLinks'][i]['url'];
          this.facebookForm.controls.facebook.setValue(this.facebookLink);
          this.facebookId = this.userJsonData['socialMediaLinks'][i]['_id'];
        } else if (this.userJsonData['socialMediaLinks'][i]['name'] === "24ent") {
          this.entLink = this.userJsonData['socialMediaLinks'][i]['url'];
          this.entForm.controls.ent.setValue(this.entLink);
          this.entId = this.userJsonData['socialMediaLinks'][i]['_id'];
        }
      }
    }
  }

  addBank() {
    this.bankDetail.routing_number = "1234";
    this.bankDetail.account_number = "23443234";
    this.bankDetail.type_of_bank_account = "saving";
    this.bankDetail.country = "india";
    this.bankDetail.first_name = "amit";
    this.bankDetail.last_name = "meh";
    this.bankDetail.business_name = "dkdkkd";
    this.bankDetail.email = "test@gmail.com";
    console.log(this.getBankDetail());  
    this.profileService.addBank(this.bankDetail);
  }

  getBankDetail(){
    this.profileService.getBankDetail().subscribe((data: any)=>{
      console.log(data);
    }, (error)=>{
      this.toastr.error(error['error']['message']);
    })
  }

  getCardDetail(){
    this.profileService.getCardDetail().subscribe((data:any)=>{
      console.log("card detail",data);
      alert('succeess')
    }, (error) =>{
      this.toastr.error(error['error']['message']);
      alert('error')
    })
  }

  addCard() {
    this.cardDetail.name_on_card = "1234";
    this.cardDetail.card_number = "23433234";
    this.cardDetail.expire_date = "2022-05-25T08:55:45.559+00:00";
    this.cardDetail.country = "india";
    this.cardDetail.cvc = "amit";
    this.getCardDetail();    
    this.profileService.addCard(this.cardDetail);
  }

  get aboutFormChecker() { return this.aboutForm.controls; }
  get displayNameFormChecker() { return this.displayNameForm.controls; }
  get usernameFormChecker() { return this.usernameForm.controls; }
  get emailFormChecker() { return this.emailForm.controls; }
  get passwordFormChecker() { return this.passwordForm.controls; }
  get locationFormChecker() { return this.locationForm.controls; }
  get websiteFormChecker() { return this.websiteForm.controls; }
  get instagramFormChecker() { return this.instagramForm.controls; }
  get tiktokFormChecker() { return this.tiktokForm.controls; }
  get twitterFormChecker() { return this.twitterForm.controls; }
  get facebookFormChecker() { return this.facebookForm.controls; }
  get entFormChecker() { return this.entForm.controls; }
  get profileUrlFormChecker() { return this.profileUrlForm.controls; }

  submitAbout() {

    var profileValue = {
      "bio": this.aboutFormChecker.about.value
    }

    console.log(profileValue);

    this.submittedAboutForm = true;
    if (this.aboutForm.invalid) {
      return;
    }
    else {
      this.spinner.show();

      this.profileService.editProfile(profileValue).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          localStorage.setItem('userData', JSON.stringify(data['data']));
          this.setEditVales();
          this.spinner.hide();
          this.toastr.success(data['message']);
        }
        else {
          this.spinner.hide();
          this.submittedAboutForm = false;
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        this.submittedAboutForm = false;
        this.toastr.error(error['message']);
      });
    }
  }

  submitDisplayName() {
    var profileValue = {
      "fullName": this.displayNameFormChecker.displayName.value
    }

    console.log(profileValue);

    this.submittedDisplayNameForm = true;
    if (this.displayNameForm.invalid) {
      return;
    }
    else {
      this.spinner.show();

      this.profileService.editProfile(profileValue).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          localStorage.setItem('userData', JSON.stringify(data['data']));
          this.setEditVales();
          this.spinner.hide();
          this.toastr.success(data['message']);
        }
        else {
          this.spinner.hide();
          this.submittedDisplayNameForm = false;
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        this.submittedDisplayNameForm = false;
        this.toastr.error(error['message']);
      });
    }
  }

  submitUsername() {
    var profileValue = {
      "userName": this.usernameFormChecker.username.value
    }

    console.log(profileValue);

    this.submittedUsernameForm = true;
    if (this.usernameForm.invalid) {
      return;
    }
    else {
      this.spinner.show();

      this.profileService.editProfile(profileValue).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          localStorage.setItem('userData', JSON.stringify(data['data']));
          this.setEditVales();
          this.spinner.hide();
          this.toastr.success(data['message']);
        }
        else {
          this.spinner.hide();
          this.submittedUsernameForm = false;
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        this.submittedUsernameForm = false;
        this.toastr.error(error['message']);
      });
    }
  }

  submitEmail() {
    var profileValue = {
      "email": this.emailFormChecker.email.value
    }

    console.log(profileValue);

    this.submittedEmailForm = true;
    if (this.emailForm.invalid) {
      return;
    }
    else {
      this.spinner.show();

      this.profileService.editProfile(profileValue).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          localStorage.setItem('userData', JSON.stringify(data['data']));
          this.setEditVales();
          this.spinner.hide();
          this.toastr.success(data['message']);
        }
        else {
          this.spinner.hide();
          this.submittedEmailForm = false;
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        this.submittedEmailForm = false;
        this.toastr.error(error['message']);
      });
    }
  }

  submitPassword() {
    var profileValue = {
      "passwordResetToken": this.userJsonData['passwordResetToken'],
      "password": this.passwordFormChecker.newPassword.value
    }

    console.log(profileValue);

    this.submittedPasswordForm = true;
    if (this.passwordForm.invalid) {
      return;
    }
    else {
      if (this.passwordFormChecker.newPassword.value === this.passwordFormChecker.confirmNewPassword.value) {
        this.spinner.show();

        this.profileService.editProfile(profileValue).subscribe((data: any) => {
          console.log(data);
          if (data['statusCode'] === 200) {
            localStorage.setItem('userData', JSON.stringify(data['data']));
            this.setEditVales();
            this.spinner.hide();
            this.toastr.success(data['message']);
          }
          else {
            this.spinner.hide();
            this.submittedPasswordForm = false;
            this.toastr.error(data['message']);
          }
        }, (error) => {
          this.spinner.hide();
          this.submittedPasswordForm = false;
          this.toastr.error(error['message']);
        });
      } else {
        this.spinner.hide();
        this.submittedPasswordForm = false;
        this.toastr.error("Your passwords do not match. Please type carefully.");
      }
    }
  }

  submitLocation() {
    var profileValue = {
      "location": {
        "name": this.locationFormChecker.location.value,
        "latLng": []
      }
    }

    console.log(profileValue);

    this.submittedLocationForm = true;
    if (this.locationForm.invalid) {
      return;
    }
    else {
      this.spinner.show();

      this.profileService.editProfile(profileValue).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          localStorage.setItem('userData', JSON.stringify(data['data']));
          this.setEditVales();
          this.spinner.hide();
          this.toastr.success(data['message']);
        }
        else {
          this.spinner.hide();
          this.submittedLocationForm = false;
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        this.submittedLocationForm = false;
        this.toastr.error(error['message']);
      });
    }
  }

  submitWebsite() {
    var profileValue = {
      "website": this.websiteFormChecker.website.value,
    }

    console.log(this.websiteFormChecker.website.errors);

    this.submittedWebsiteForm = true;
    if (this.websiteForm.invalid) {
      return;
    }
    else {

      this.spinner.show();

      this.profileService.editProfile(profileValue).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          localStorage.setItem('userData', JSON.stringify(data['data']));
          this.setEditVales();
          this.spinner.hide();
          this.toastr.success(data['message']);
        }
        else {
          this.spinner.hide();
          this.submittedWebsiteForm = false;
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        this.submittedWebsiteForm = false;
        this.toastr.error(error['message']);
      });
    }
  }

  submitInstagram() {

    this.socialMediaLinks = {
      "socialMediaLinks": [
        {
          "name": "instagram",
          "url": this.instagramFormChecker.instagram.value
          //"_id": this.instagramId
        },
        {
          "name": "tiktok",
          "url": this.tiktokLink
          //"_id": this.tiktokId
        },
        {
          "name": "twitter",
          "url": this.twitterLink
          //"_id": this.twitterId
        },
        {
          "name": "facebook",
          "url": this.facebookLink
          //"_id": this.facebookId
        },
        {
          "name": "24ent",
          "url": this.entLink
          //"_id": this.entId
        }
      ]
    }

    console.log(this.socialMediaLinks);

    this.submittedInstagramForm = true;
    if (this.instagramForm.invalid) {
      return;
    }
    else {
      this.spinner.show();

      this.profileService.editProfile(this.socialMediaLinks).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          localStorage.setItem('userData', JSON.stringify(data['data']));
          this.setEditVales();
          this.spinner.hide();
          this.toastr.success(data['message']);
        }
        else {
          this.spinner.hide();
          this.submittedInstagramForm = false;
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        this.submittedInstagramForm = false;
        this.toastr.error(error['message']);
      });
    }
  }

  submitTiktok() {
    this.socialMediaLinks = {
      "socialMediaLinks": [
        {
          "name": "instagram",
          "url": this.instagramLink
          // "_id": this.instagramId
        },
        {
          "name": "tiktok",
          "url": this.tiktokFormChecker.tiktok.value
          //"_id": this.tiktokId
        },
        {
          "name": "twitter",
          "url": this.twitterLink
          //"_id": this.twitterId
        },
        {
          "name": "facebook",
          "url": this.facebookLink
          //"_id": this.facebookId
        },
        {
          "name": "24ent",
          "url": this.entLink
          //"_id": this.entId
        }
      ]
    }

    console.log(this.socialMediaLinks);

    this.submittedTiktokForm = true;
    if (this.tiktokForm.invalid) {
      return;
    }
    else {
      this.spinner.show();

      this.profileService.editProfile(this.socialMediaLinks).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          localStorage.setItem('userData', JSON.stringify(data['data']));
          this.setEditVales();
          this.spinner.hide();
          this.toastr.success(data['message']);
        }
        else {
          this.spinner.hide();
          this.submittedTiktokForm = false;
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        this.submittedTiktokForm = false;
        this.toastr.error(error['message']);
      });
    }
  }

  submitTwitter() {
    this.socialMediaLinks = {
      "socialMediaLinks": [
        {
          "name": "instagram",
          "url": this.instagramLink
          //"_id": this.instagramId
        },
        {
          "name": "tiktok",
          "url": this.tiktokLink
          //"_id": this.tiktokId
        },
        {
          "name": "twitter",
          "url": this.twitterFormChecker.twitter.value
          //"_id": this.twitterId
        },
        {
          "name": "facebook",
          "url": this.facebookLink
          //"_id": this.facebookId
        },
        {
          "name": "24ent",
          "url": this.entLink
          //"_id": this.entId
        }
      ]
    }

    console.log(this.socialMediaLinks);

    this.submittedTwitterForm = true;
    if (this.twitterForm.invalid) {
      return;
    }
    else {
      this.spinner.show();

      this.profileService.editProfile(this.socialMediaLinks).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          localStorage.setItem('userData', JSON.stringify(data['data']));
          this.setEditVales();
          this.spinner.hide();
          this.toastr.success(data['message']);
        }
        else {
          this.spinner.hide();
          this.submittedTwitterForm = false;
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        this.submittedTwitterForm = false;
        this.toastr.error(error['message']);
      });
    }
  }

  submitFacebook() {
    this.socialMediaLinks = {
      "socialMediaLinks": [
        {
          "name": "instagram",
          "url": this.instagramLink
          //"_id": this.instagramId
        },
        {
          "name": "tiktok",
          "url": this.tiktokLink
          //"_id": this.tiktokId
        },
        {
          "name": "twitter",
          "url": this.twitterLink
          //"_id": this.twitterId
        },
        {
          "name": "facebook",
          "url": this.facebookFormChecker.facebook.value
          //"_id": this.facebookId
        },
        {
          "name": "24ent",
          "url": this.entLink
          //"_id": this.entId
        }
      ]
    }

    console.log(this.socialMediaLinks);

    this.submittedFacebookForm = true;
    if (this.facebookForm.invalid) {
      return;
    }
    else {
      this.spinner.show();

      this.profileService.editProfile(this.socialMediaLinks).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          localStorage.setItem('userData', JSON.stringify(data['data']));
          this.setEditVales();
          this.spinner.hide();
          this.toastr.success(data['message']);
        }
        else {
          this.spinner.hide();
          this.submittedFacebookForm = false;
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        this.submittedFacebookForm = false;
        this.toastr.error(error['message']);
      });
    }
  }

  submitEnt() {
    this.socialMediaLinks = {
      "socialMediaLinks": [
        {
          "name": "instagram",
          "url": this.instagramLink
          //"_id": this.instagramId
        },
        {
          "name": "tiktok",
          "url": this.tiktokLink
          //"_id": this.tiktokId
        },
        {
          "name": "twitter",
          "url": this.twitterLink
          //"_id": this.twitterId
        },
        {
          "name": "facebook",
          "url": this.facebookLink
          //"_id": this.facebookId
        },
        {
          "name": "24ent",
          "url": this.entFormChecker.ent.value
          //"_id": this.entId
        }
      ]
    }

    console.log(this.socialMediaLinks);

    this.submittedEntForm = true;
    if (this.entForm.invalid) {
      return;
    }
    else {
      this.spinner.show();

      this.profileService.editProfile(this.socialMediaLinks).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          localStorage.setItem('userData', JSON.stringify(data['data']));
          this.setEditVales();
          this.spinner.hide();
          this.toastr.success(data['message']);
        }
        else {
          this.spinner.hide();
          this.submittedEntForm = false;
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        this.submittedEntForm = false;
        this.toastr.error(error['message']);
      });
    }
  }

  uploadPicture(postData: any) {
    console.log(postData);
    this.spinner.show();

    this.profileService.editProfile(postData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        localStorage.setItem('userData', JSON.stringify(data['data']));
        this.setEditVales();
        this.spinner.hide();
        this.toastr.success(data['message']);
      }
      else {
        this.spinner.hide();
        this.submittedEntForm = false;
        this.toastr.error(data['message']);
      }
    }, (error) => {
      this.spinner.hide();
      this.submittedEntForm = false;
      this.toastr.error(error['message']);
    });
  }

  async openFileSelector(selectorType: any) {
    if (selectorType === "cover") {
      $("#fileCover").trigger("click");
    } else if (selectorType === "profile") {
      $("#file").trigger("click");
    }
  }

  async uploadImage(filePath: any, jsonKey: any) {
    const file = this.selectedFiles;
    let res: any = await this.uploadService.uploadFile(file, filePath);
    console.log(res);

    if (jsonKey === "profileImage") {
      this.uploadPicture({
        "profileImage": res['Location'],
      })
    } else if (jsonKey === "coverImage") {
      this.uploadPicture({
        "coverImage": res['Location'],
      })
    }
  }

  selectProfileFile(event: any, fileType: any) {
    this.spinner.show();
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file.name);
      let filePath = Math.random() * 10000000000000000 + '_' + file.name;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      }
      this.selectedFiles = file;
      if (fileType === "profileImage") {
        this.uploadImage(filePath, "profileImage");
      } else if (fileType === "coverImage") {
        this.uploadImage(filePath, "coverImage");
      }
    }
  }

  fetchCard() {
    this.userService.fetchCard().subscribe((data: any) => {

      console.log(data);

      if (data['statusCode'] === 200) {

        this.cardList = data['card'];

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

  fetchBankAccount() {
    this.userService.fetchBankAccount().subscribe((data: any) => {

      console.log(data);

      if (data['statusCode'] === 200) {

        this.bankAccountList = data['bank'];

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

  deleteCard(Id: any) {
    let data = { "_id": Id };
    console.log(data);
    this.spinner.show();
    this.userService.deleteCard(data).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.spinner.hide();
        this.toastr.success(data['message']);
        this.fetchCard();
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

  deleteBankAccount(Id: any) {
    console.log(Id);
    this.spinner.show();
    this.userService.deleteBankAccount({ "_id": Id }).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.spinner.hide();
        this.toastr.success(data['message']);
        this.fetchBankAccount();
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

  replaceLastChar(number: any) {
    number = number.slice(0, -4) + "****";
    number = number.match(/.{1,4}/g);
    return number.join(' ')
  }

  public AddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress = address.formatted_address
  }

  shareOnSocialMedia(type: any) {
    if (type === "facebook") {
      const navUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + 'https://chello.world' + this.username;
      window.open(navUrl, '_blank');
    } else if (type === "instagram") {

    } else if (type === "twitter") {
      const navUrl = 'https://twitter.com/intent/tweet?text=' + 'https://chello.world' + this.username;
      window.open(navUrl, '_blank');
    } else if (type === "tiktok") {

    }

  }

  async connectSpotify() {
    var width = 450, height = 730, left = (screen.width / 2) - (width / 2), top = (screen.height / 2) - (height / 2);

    var w = window.location.href = 'https://accounts.spotify.com/authorize?client_id=' + this.baseurl.spotifyClientId +
      '&redirect_uri=' + this.baseurl.spotifyRedirectUrl +
      '&scope=user-read-private user-read-email&response_type=code';
  }

  async getSpotifyAccessToken() {
    this.spinner.show();
    this.userService.getSpotifyProfileToken(this.spotifyCode).subscribe((data: any) => {
      console.log(data);
      this.getSpotifyProfile(data['access_token']);
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    });
  }
  
  getSpotifyProfile(accessToken: any){
    this.userService.getSpotifyProfile(accessToken).subscribe((data: any) => {
      console.log(data);
      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    });
  }

  changeRole() {
    this.spinner.show();
    this.profileService.editProfile({ 'role': 'creator' }).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        localStorage.setItem('userData', JSON.stringify(data['data']));
        this.role = 'creator';
        this.setEditVales();
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

  manageSubscription() {
    this.router.navigate([this.routernavigate.customizeSubscription]);
  }

  changeLanguage(language: string) {
    console.log("the selected value is " + language);
    this.myLanguage = language;
    this.spinner.show();
    this.profileService.editProfile({ 'language': language }).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        localStorage.setItem('userData', JSON.stringify(data['data']));
        this.role = 'creator';
        this.setEditVales();
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
}
