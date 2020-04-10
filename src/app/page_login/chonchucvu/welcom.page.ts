import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { app } from 'firebase';
import { Router, Navigation } from '@angular/router';


import { Platform, AlertController } from '@ionic/angular'
import { AuthenticationService } from '../shared/authenticatin-Service'


@Component({
  selector: 'app-welcom',
  templateUrl: './welcom.page.html',
  styleUrls: ['./welcom.page.scss'],
})
export class WelcomPage implements OnInit {

  backButtonSubscription;
  registerBackButtonAction;
  public chucvu = ''
  
  constructor(
    private platform : Platform,
    public router : Router,
    public authService : AuthenticationService
    ) {
   }

  ngOnInit() {
  }
  
  getId(event)
  {
    this.chucvu = event.target.id
    console.log(this.chucvu)
  }
  readyApp()
  {
    if(this.chucvu !== '')
    {
      this.authService.setChucvu(this.chucvu + "")  
      this.router.navigate(['dangky'])
    }
    else
    {
      this.authService.presentAlert4('Bạn chưa chọn chức vụ của mình!')
    }
    //console.log(this.getChucvu())
    //console.log(this.chucvu)
  }
  exitApp()
  {
      this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }
}
