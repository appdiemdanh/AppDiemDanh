import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { app } from 'firebase';
import { Router, Navigation } from '@angular/router';

import { Platform } from '@ionic/angular'


@Component({
  selector: 'app-welcom',
  templateUrl: './welcom.page.html',
  styleUrls: ['./welcom.page.scss'],
})
export class WelcomPage implements OnInit {

  backButtonSubscription;
  registerBackButtonAction;
  public static chucvu = 'giangvien'
  constructor(private platform : Platform) {
    //this.navigator = navigator
   }

  ngOnInit() {
  }
  getChucvu(event)
  {
    WelcomPage.chucvu = event.target.id
    //console.log(this.chucvu)
  }
  exitApp()
  {
      this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }
}
