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
import { HeaderModule } from '../modules/layout/header/header.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  public searchUser(data: any) {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json' });
    const requestOptions = { headers: header };

    return this.http.post(this.base_url + 'findUser', data, requestOptions)
  }

  public findUserById(data: any) {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json' });
    const requestOptions = { headers: header };

    return this.http.post(this.base_url + 'findUserById', data, requestOptions)
  }

  public findUserByUsername(data: any) {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json' });
    const requestOptions = { headers: header };

    return this.http.post(this.base_url + 'findUserByUserName', data, requestOptions)
  }

  public currentUser() {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };

    return this.http.get(this.base_url + 'user', requestOptions)
  }

  public findUserByEmailId(data: any) {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json' });
    const requestOptions = { headers: header };

    return this.http.post(this.base_url + 'findUserByEmail', data, requestOptions)
  }

  public fetchCard() {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json' });
    const requestOptions = { headers: header };

    return this.http.post(this.base_url + 'paymentDetail/cardDetail', null, requestOptions)
  }

  public fetchBankAccount() {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json' });
    const requestOptions = { headers: header };

    return this.http.post(this.base_url + 'paymentDetail/bankDetail', null, requestOptions)
  }

  public deleteCard(data: any) {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json', body: data });
    const requestOptions = { headers: header, body: data };

    return this.http.delete(this.base_url + 'paymentDetail/deleteCard', requestOptions)
  }

  public deleteBankAccount(data: any) {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json', body: data });
    const requestOptions = { headers: header, body: data };

    return this.http.delete(this.base_url + 'paymentDetail/deleteBank', requestOptions)
  }

  public getSpotifyProfileToken(code: any) {
    var client_id = this.baseurl.spotifyClientId;
    var client_secret = this.baseurl.spotifyClientSecret;

    const body = new HttpParams()
    .set('grant_type', 'authorization_code')
    .set('code', code)
    .set('redirect_uri', 'http://localhost:4200/profile-edit');
    
    let header = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret), 'Content-Type': 'application/x-www-form-urlencoded' });
    const requestOptions = { headers: header };

    console.log(body.toString());

    return this.http.post('https://accounts.spotify.com/api/token', body.toString(), requestOptions)
  }

  public getSpotifyProfile(token: any) {
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };

    return this.http.get('https://api.spotify.com/v1/me', requestOptions)
  }

  public blockUser(data:any){
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token,  'Content-Type': 'application/json' });
    const requestOptions = {  headers: header};  
    
	  return this.http.post(this.base_url + 'blockuser', data, requestOptions)
  }

  public restrictUser(data:any){
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token,  'Content-Type': 'application/json' });
    const requestOptions = {  headers: header};  
    
	  return this.http.post(this.base_url + 'restrictuser', data, requestOptions)
  }

  public fetchBlockList(data:any){
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token,  'Content-Type': 'application/json' });
    const requestOptions = {  headers: header};  
    
	  return this.http.post(this.base_url + 'blockUserList', data, requestOptions)
  }

  public fetchRestrictList(data:any){
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token,  'Content-Type': 'application/json' });
    const requestOptions = {  headers: header};  
    
	  return this.http.post(this.base_url + 'restrictUserList', data, requestOptions)
  }

  public addSubscription(data: any) {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json' });
    const requestOptions = { headers: header };

    return this.http.post(this.base_url + 'subscription/addSubscriptionForPhotos', data, requestOptions)
  }

  public getSubscription() {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json' });
    const requestOptions = { headers: header };

    return this.http.post(this.base_url + 'subscription/SubscriptionDetails', null, requestOptions)
  }

  public deleteSubscription(data: any) {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json', body: data });
    const requestOptions = { headers: header, body: data };

    return this.http.delete(this.base_url + 'subscription/deleteSubscriptionForPhotos', requestOptions)
  }

  public editSubscription(data: any) {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json' });
    const requestOptions = { headers: header };

    return this.http.post(this.base_url + 'subscription/updateSubscriptionForPhotos', data, requestOptions)
  }
}
