import { Injectable, NgZone } from '@angular/core';
import { baseurl } from '../utils/base-url';
import { routers } from '../utils/router-navigate';
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  userData: any;
  base_url: any;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public baseurl: baseurl,
    public routernavigate: routers,
    private http: HttpClient
  ) {
    this.base_url = this.baseurl.url;
  }

  uploadFile(file: any, filePath: any) {
    return new Promise((resolve, reject) => {
      const contentType = file.type;
      const bucket = new S3({
        accessKeyId: 'AKIA2YQHZPOYGCRTTEH7',
        secretAccessKey: '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',
        region: 'us-east-1'
      });
      const params = {
        Bucket: 'chello-data',
        Key: filePath,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
      };
      bucket.upload(params, function (err: any, data: any) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

}
