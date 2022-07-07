import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { APP_BASE_HREF, CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { baseurl } from './utils/base-url';
import { routers } from './utils/router-navigate';
import { veriables } from './utils/variables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { browserPopupRedirectResolver, browserSessionPersistence } from 'firebase/auth';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PostsFilterPipe } from './pipe/postFilter.pipe';

const firebaseConfig = {
  apiKey: "AIzaSyDN4tj9GQmKLEMoy34HpxqoW98FO9AcKDs",
  authDomain: "chello-8dbfb.firebaseapp.com",
  projectId: "chello-8dbfb",
  storageBucket: "chello-8dbfb.appspot.com",
  messagingSenderId: "1055858869877",
  appId: "1:1055858869877:web:60d7f147e8a54376a79a3c",
  measurementId: "G-2B0QLNJ0VN"
};

@NgModule({
  declarations: [
    AppComponent,
    // PostsFilterPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ToastContainerModule,
    NgxSpinnerModule,
    NgxIntlTelInputModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    baseurl,
    routers,
    veriables
  ],
  // exports: [PostsFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
