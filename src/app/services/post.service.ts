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

@Injectable({
  providedIn: 'root'
})
export class PostService {

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

  public postFeed(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };
    console.log('postFeed', data);

    return this.http.post<any>(this.base_url + 'posts/create', data, requestOptions);
  }

  public getGlobalFeed(data: any) {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json' });
    const requestOptions = { headers: header };

    return this.http.post(this.base_url + 'posts/all', data, requestOptions)
  }

  public getUserFeed(data: any) {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header, body: data };

    return this.http.post(this.base_url + 'posts', data, requestOptions)
  }

  public postStory(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };

    return this.http.post<any[]>(this.base_url + 'stories', data, requestOptions);
  }

  public postdeleteStory(Id: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };

    return this.http.delete<any[]>(this.base_url + 'stories/' + Id, requestOptions);
  }

  public postComment(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };

    return this.http.post<any[]>(this.base_url + 'postcomment/addcomment', data, requestOptions);
  }

  public deleteComment(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token, body: data });
    const requestOptions = { headers: header };

    return this.http.delete<any[]>(this.base_url + 'postcomment/delete', requestOptions);
  }

  public createPoll(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };

    return this.http.post<any[]>(this.base_url + 'poll/create', data, requestOptions);
  }

  public postFavorite(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };

    return this.http.post<any[]>(this.base_url + 'postfavorite', data, requestOptions);
  }

  public postBookmark(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };

    return this.http.post<any[]>(this.base_url + 'postbookmark', data, requestOptions);
  }

  public deletePost(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header, body: data };

    return this.http.delete<any[]>(this.base_url + 'posts/delete', requestOptions);
  }

  public getComment(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };

    return this.http.post<any[]>(this.base_url + 'postcomment/all', data, requestOptions);
  }

  public editComment(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };

    return this.http.put<any[]>(this.base_url + 'postcomment/edit', data, requestOptions);
  }

  public pollVoting(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };

    return this.http.post<any[]>(this.base_url + 'pollvoting/vote', data, requestOptions);
  }

  public getStory(): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };

    return this.http.get<any[]>(this.base_url + 'stories/getStories', requestOptions);
  }

  public getGlobalStories(): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header };

    return this.http.post<any[]>(this.base_url + 'stories/all', {"pageNumber": 1}, requestOptions);
  }
}
