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
    const requestOptions = { headers: header };

    return this.http.delete(this.base_url + 'paymentDetail/deleteCard', requestOptions)
  }

  public deleteBankAccount(data: any) {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json', body: data });
    const requestOptions = { headers: header };

    return this.http.delete(this.base_url + 'paymentDetail/deleteBank', requestOptions)
  }

  public connectSpotify() {
    var CLIENT_ID = 'a0541d4ce18545059f39a34d6b58127c';
    var REDIRECT_URI = 'http://jmperezperez.com/spotify-oauth-jsfiddle-proxy/';
    var scopes = [
      'user-read-email'
    ];
    
    return this.http.get('https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
      '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
      '&scope=' + encodeURIComponent(scopes.join(' ')) +
      '&response_type=token')
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

}
