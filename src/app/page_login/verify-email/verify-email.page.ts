import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../shared/authenticatin-Service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  constructor(
    public authService : AuthenticationService
  ) { }

  ngOnInit() {
  }

  reSendEmail()
  {
    this.authService.SendVerificationMail();
    alert('Đã gửi lại email thành công')
  }
}
