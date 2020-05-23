import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/authenticatin-Service';
import { IonApp, NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-xacthuc-email',
  templateUrl: './xacthuc-email.page.html',
  styleUrls: ['./xacthuc-email.page.scss'],
})
export class XacthucEmailPage implements OnInit {

  constructor(
    public authService : AuthenticationService,
    public appCtrl : IonApp,
    public router : Router,
    public navCtrl : NavController
  ) { }

  ngOnInit() {
  }

  reSendEmail()
  {
    this.authService.SendVerificationMail();
    this.authService.presentAlert4('Gửi lại email thành công')
  }
  backLogin()
  {
    this.navCtrl.navigateForward('/dangnhap')
  }
}
