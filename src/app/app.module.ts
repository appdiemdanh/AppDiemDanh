import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // de su dung duoc ngModul ==> lay du lieu tu edittext

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { AuthenticationService } from './page_login/shared/authenticatin-Service';
import { DangnhapPage } from './page_login/dangnhap/dangnhap.page'
import { WelcomPage } from './page_login/chonchucvu/welcom.page'
import { AngularFireDatabase } from '@angular/fire/database';
import { HomePage } from './page_daotao/home/home.page'
//import {  } from '@angular/core'

@NgModule({
  declarations: [AppComponent,
                ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig), // connect with firebase
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    // những import mà không có trên project thì phải add vô đây nữa nha
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //add 
    AuthenticationService,
    AngularFirestoreModule,
    DangnhapPage,
    WelcomPage,
    AngularFireDatabase,
    HomePage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
