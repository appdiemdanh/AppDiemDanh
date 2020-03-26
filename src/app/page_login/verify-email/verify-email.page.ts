import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../shared/authenticatin-Service';
import { IonApp, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  public static clickBack : boolean = false
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
    alert('Đã gửi lại email thành công')
  }
  backLogin()
  {
    this.navCtrl.navigateForward('/dangnhap')
    //VerifyEmailPage.clickBack = true
    //this.router.navigate(['dangnhap'])
    //this.router.navigateByUrl('/verify-email', { skipLocationChange: true }).then(() => {
      //this.router.navigate(['dangnhap']);
    //}); 
  }
}
