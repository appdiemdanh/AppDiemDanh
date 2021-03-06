import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'
import { AuthenticationService } from '../../shared/authenticatin-Service'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-quenmatkhau',
  templateUrl: './quenmatkhau.page.html',
  styleUrls: ['./quenmatkhau.page.scss'],
})
export class QuenmatkhauPage implements OnInit {

  email = ''

  constructor(
    public router : Router,
    public authService : AuthenticationService,
    public alert : AlertController
  ) { }

  ngOnInit() {
  }

  
  resetPassword()
  {    
      if(this.email.length == 0)
      {
        this.authService.presentAlert4("vui lòng không để trống ô email này")
      }
      else 
      {
        this.authService.PasswordRecover(this.email).then((res)=>
        {

        }).catch((error) =>
          {
          if(error == "TypeError: Cannot read property 'emailVerified' of null")
          {
            this.authService.presentAlert4('Email bạn nhập sai, chưa đăng ký hoặc đã bị khóa')
          }
          console.log(error)
        })
      }
  }

}
