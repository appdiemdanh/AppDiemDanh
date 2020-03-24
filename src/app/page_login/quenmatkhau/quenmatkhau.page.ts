import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'
import { AuthenticationService } from '../shared/authenticatin-Service'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-quenmatkhau',
  templateUrl: './quenmatkhau.page.html',
  styleUrls: ['./quenmatkhau.page.scss'],
})
export class QuenmatkhauPage implements OnInit {

  passwordRequet : 'toiyeuban123'
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
        alert("vui lòng không để trống ô email này")
      }
      this.authService.PasswordRecover(this.email).then((res)=>
      {
        
      }).catch((error) =>
      {
        if(error == "TypeError: Cannot read property 'emailVerified' of null")
        {
          alert('Email bạn nhập sai, chưa đăng ký hoặc đã bị khóa')
        }
        console.log(error)
      })
  }

}
