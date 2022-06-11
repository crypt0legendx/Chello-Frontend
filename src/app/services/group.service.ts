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
export class GroupService {

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

  public creatGroup(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.post<any[]>(this.base_url + 'group/createGroup', data, requestOptions);
  }

  public getGroup(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.post<any[]>(this.base_url + 'group/all', data, requestOptions);
  }

  public editGroup(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.post<any[]>(this.base_url + 'group/editGroup', data, requestOptions);
  }

  public deleteGroup(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header, body: data};

    return this.http.delete<any[]>(this.base_url + 'group/deleteGroup', requestOptions);
  }

  public sendInviteGroupMember(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.post<any[]>(this.base_url + 'group/sendInviteGroupMember', data, requestOptions);
  }

  public inviteActionByMember(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.post<any[]>(this.base_url + 'group/inviteActionByMember', data, requestOptions);
  }

  public createGroupPost(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.post<any[]>(this.base_url + 'group/createGroupPost', data, requestOptions);
  }

  public getGroupPost(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.post<any[]>(this.base_url + 'group/groupPost', data, requestOptions);
  }

  public deleteGroupPost(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header, body: data};

    return this.http.delete<any[]>(this.base_url + 'group/deletePost', requestOptions);
  }

  public postFavorite(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.post<any[]>(this.base_url + 'grouppostlike', data, requestOptions);
  }

  public postComment(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.post<any[]>(this.base_url + 'grouppostcomment/addcomment', data, requestOptions);
  }

  public deleteComment(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, body: data});
    const requestOptions = {headers: header};

    return this.http.delete<any[]>(this.base_url + 'grouppostcomment/delete', requestOptions);
  }

  public getComment(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.post<any[]>(this.base_url + 'grouppostcomment/all', data, requestOptions);
  }

  public editComment(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.put<any[]>(this.base_url + 'grouppostcomment/edit', data, requestOptions);
  }

  public getGroupMember(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.post<any[]>(this.base_url + 'group/usersList', data, requestOptions);
  }

  public removeMemberFromGroup(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, body: data});
    const requestOptions = {headers: header};

    return this.http.delete<any[]>(this.base_url + 'group/removeMember', requestOptions);
  }

  public getGroupJoinRequest(): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.get<any[]>(this.base_url + 'group/groupJoinRequest', requestOptions);
  }

  public getGlobalGroup(): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.get<any[]>(this.base_url + 'group/groupNotJoinedYet', requestOptions);
  }

  public getMyGroupAndJoined(): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.get<any[]>(this.base_url + 'group/myGroupAndJoined', requestOptions);
  }
}
