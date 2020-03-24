import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

import { Router } from '@angular/router';
import { WelcomPage } from '../welcome/welcom.page'
import { AuthenticationService } from '../shared/authenticatin-Service'
import { error } from 'protractor';
import { VerifyEmailPage } from '../verify-email/verify-email.page';

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.page.html',
  styleUrls: ['./dangnhap.page.scss'],
})
export class DangnhapPage implements OnInit {

  user = ''
  public email = ''
  public password = ''
  chucvu  = ''

  public e = ''
  constructor(
    public navCtrl : NavController,
    public router : Router,
    public authService : AuthenticationService,
    public loadingController : LoadingController,
    public welcomePage : WelcomPage
    ) { 
      this.chucvu = this.authService.getChucvu()
      
    }

  ngOnInit() {
    
  }
  

  public setUser(text : String)
  {
    this.email = text + ""
  }
  public getUser()
  {
    return this.email 
  }

  public getClick()
  {
    if(VerifyEmailPage.clickBack = true)
      {
        window.location.reload(true)
      }
  }
  logIn()
  {
    //console.log(this.chucvu)
    if((this.email && this.password) != "")
    {
        this.authService.SignIn(this.email, this.password).then((res)=>
        {
          if(this.authService.isEmailVerified == true)
          {
            if(this.chucvu == 'daotao')
            {
            this.authService.presentLoading('Vui lòng chờ...', 2500);
            this.router.navigate(['tabs/home'])
            console.log('Đăng nhập thành công')
            }
            else{
              console.log('Đăng nhập thất bại')
            }
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
      alert('Bạn chưa nhập đầy đủ thông tin!')
    }
}

  loginGoogle()
  {
    this.authService.GoogleAuth().then((res)=>
    {
      this.authService.presentLoading("Vui lòng chờ...", 2500)
    });
  }
}
