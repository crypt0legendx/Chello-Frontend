import { NameValidator } from 'src/app/validators/name.validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { routers } from '../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import countryCode from '../../../utils/country-code.json';
import { UploadService } from '../../../services/upload.service';

declare var swal: any;
declare var $: any;

const getMonth = (idx: any) => {

  var objDate = new Date();
  objDate.setDate(1);
  objDate.setMonth(idx - 1);

  var locale = "en-us",
    month = objDate.toLocaleString(locale, { month: "short" });

  return month;
}

@Component({
  selector: 'app-verify-id',
  templateUrl: '../pages/verify-id.component.html',
  styleUrls: ['../pages/verify-id.component.scss']
})
export class VerifyIdComponent implements OnInit {

  registerForm!: FormGroup;
  otpForm!: FormGroup;
  submitted: any;
  countryCodeList: any = countryCode;
  countryName: any = "US";

  profileUrl: any = "";

  selectedFiles: any = '';
  imageSrc: string = '';

  uploadId1URL: any = '';
  uploadId2URL: any = '';
  uploadFile1Name: any = '';
  uploadFile2Name: any = '';

  userJsonData: any;
  role: any = "creator";

  months = Array(12).fill(0).map((i,idx) => getMonth(idx + 1));
  years = Array(new Date().getUTCFullYear() - (new Date().getUTCFullYear() - 100)).fill('').map((v, idx) => new Date().getUTCFullYear() - idx) as Array<number>;

  selectedYear = 1970;
  selectedMonth = 1;
  selectedDay = 1;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public uploadService: UploadService
  ) {
    this.spinner.hide();
  }

  ngOnInit(): void {
    let retrievedObject: any = localStorage.getItem('userData');
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    if (retrievedObject) {
      this.userJsonData = JSON.parse(retrievedObject);
      console.log(this.userJsonData);
      if (this.userJsonData['role'] === "creator") {
        this.role = this.userJsonData['role'];
        this.registerForm = this.formBuilder.group({
          legalFullName: ['', [Validators.required, NameValidator.cannotContainOnlySpace]],
          addressLine1: ['', [Validators.required, NameValidator.cannotContainOnlySpace]],
          addressLine2: [''],
          month: ['', Validators.required],
          day: ['', Validators.required],
          year: ['', Validators.required],
          ageAgree: ['', Validators.required],
          uploadId1: ['', Validators.required],
          uploadId2: ['', Validators.required],
          socialLink: ['', [Validators.required, NameValidator.cannotContainOnlySpace, Validators.pattern(reg)]]
        });
      } else {
        this.role = this.userJsonData['role'];
        this.registerForm = this.formBuilder.group({
          legalFullName: ['', [Validators.required, NameValidator.cannotContainOnlySpace]],
          addressLine1: ['', [Validators.required, NameValidator.cannotContainOnlySpace]],
          addressLine2: [''],
          month: ['', Validators.required],
          day: ['', Validators.required],
          year: ['', Validators.required],
          ageAgree: ['', Validators.required],
          uploadId1: [''],
          uploadId2: [''],
          socialLink: ['',[Validators.required, NameValidator.cannotContainOnlySpace, Validators.pattern(reg)]]
        });
      }
    }


  }

  get f() { return this.registerForm.controls; }

  submit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    else {
      var registerValue = {
        "country": this.countryName,
        "legalFullName": this.f.legalFullName.value,
        "addressLine1": this.f.addressLine1.value,
        "addressLine2": this.f.addressLine2.value,
        "Dob": this.f.month.value + " " + this.f.day.value + ", " + this.f.year.value,
        "identityProof1": this.uploadId1URL,
        "identityProof2": this.uploadId2URL,
        "socailAccountVerification": this.f.socialLink.value
      }

      console.log(registerValue);

      this.spinner.show();
      this.profileService.editProfile(registerValue).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          localStorage.setItem('userData', JSON.stringify(data['data']));
          this.router.navigate([this.routernavigate.home]);
        }
        else {
          this.spinner.hide();
          this.submitted = false;
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        this.submitted = false;
        this.toastr.error(error['error']['message']);
      });
    }
  }

  selectCountryCode(code: any) {
    console.log(code.value);
    this.countryName = code.value;
  }

  openFileSelector() {
    $("#file-input2").trigger("click");
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
      if (fileType === "uploadId1") {
        this.uploadFile1Name = file.name;
        this.uploadImage(filePath, "uploadId1");
      } else if (fileType === "uploadId2") {
        this.uploadFile2Name = file.name;
        this.uploadImage(filePath, "uploadId2");
      }
    }
  }

  async uploadImage(filePath: any, jsonKey: any) {
    const file = this.selectedFiles;
    let res: any = await this.uploadService.uploadFile(file, filePath);
    console.log(res);

    if (jsonKey === "uploadId1") {
      this.uploadId1URL = res['Location'];
    } else if (jsonKey === "uploadId2") {
      this.uploadId2URL = res['Location'];
    }

    this.spinner.hide();
  }

  selectMonth(month: any){
    this.selectedMonth = month;
  }

  selectYear(year: any){
    this.selectedYear = year;
  }

  public get days() {
    const dayCount = this.getDaysInMonth(this.selectedYear, this.selectedMonth);
    return Array(dayCount).fill(0).map((i,idx) => idx +1)
  }

  public getDaysInMonth(year: number, month: number) {
    return 32 - new Date(year, month - 1, 32).getDate();
  }
}
