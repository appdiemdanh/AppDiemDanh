import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

import { Router } from '@angular/router';
import { WelcomPage } from '../welcome/welcom.page'
import { AuthenticationService } from '../shared/authenticatin-Service'
import { error } from 'protractor';
import { WelcomPageModule } from '../welcome/welcom.module';

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.page.html',
  styleUrls: ['./dangnhap.page.scss'],
})
export class DangnhapPage implements OnInit {

  constructor(
    public navCtrl : NavController,
    public router : Router,
    public authService : AuthenticationService,
    public loadingController : LoadingController
    ) { }

  ngOnInit() {
    
  }
 
  user = ''
  email = ''
  password = ''
  chucvu = '' 

  logIn()
  {
    this.chucvu = WelcomPage.chucvu
    //console.log(email.value)
    if((this.email && this.password).length != 0)
    {
      if(this.chucvu == "daotao")
      {
        this.authService.SignIn(this.email, this.password).then((res)=>
        {
          if(this.authService.isEmailVerified == true)
          {
            this.authService.presentLoading();
            this.router.navigate(['tabs'])
            console.log('thành công')
          }
          else
          {
            alert('email này không hợp lệ hoặc chưa đăng ký!')
          }
        }).catch((error)=>{

          if(error == 'Error: The email address is badly formatted.')
          {
            alert('email định dạng sai')
          }
          else if(error == 'Error: There is no user record corresponding to this identifier. The user may have been deleted.')
          {
            alert('Email bạn nhập không đúng, chưa đăng ký hoặc bị khóa')
          }
          else if(error == 'Error: The password is invalid or the user does not have a password.')
          {
            alert('Mật khẩu không đúng')
          }
        
        })
      }
      else
      {
        console.log('Đăng nhâp thất bại!')
      }
    }
    else
    {
      alert('Bạn chưa nhập đầy đủ thông tin!')
    }
  }

  loginGoogle()
  {
    this.authService.GoogleAuth();
  }
}
