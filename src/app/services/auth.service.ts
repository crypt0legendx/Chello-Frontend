import { Injectable, NgZone  } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  public registerUser(registerData: any): Observable<any[]> {
    return this.http.post<any[]>(this.base_url + 'register', registerData);
  }

  public loginUser(loginData: any): Observable<any[]> {
    return this.http.post<any[]>(this.base_url + 'signin', loginData);
  }

  public refreshToken(): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json' });
    const requestOptions = { headers: header };
    const data:any = {};
    return this.http.post<any[]>(this.base_url + '/api/v1/refreshToken', data,requestOptions);
  }

  public forgetPassword(email: any): Observable<any[]> {
    return this.http.post<any[]>(this.base_url + 'passwords', email);
  }
}
