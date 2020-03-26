import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authenticatin-Service';

@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.page.html',
  styleUrls: ['./dangky.page.scss'],
})
export class DangkyPage implements OnInit {

  email = ''
  password = ''
  repassword = ''

  chucvu = ''

  constructor(
    public router : Router,
    public authService : AuthenticationService 
  ) { 
    this.chucvu = this.authService.getChucvu()
    if(this.chucvu == '')
    {
      this.authService.presentAlert2("Thông báo", "Xin lỗi vì sự bất tiện này, Vui lòng chọn lại chức vụ của bạn.", "welcome", "OK, Chọn chức vụ")
    }
  }

  ngOnInit() {
  }

  signUp()
  {
    if((this.email || this.password || this.repassword).length != 0)
    {
      if(this.password.length >= 6)
      {
        if(this.repassword == this.password)
        {
          // Tiến hành gọi qua hàm đăng ký bên folder shared trong lớp authentication-Service
          this.authService.RegisterUser(this.email, this.password)
          .then((res) => { // res chỉ là biếnx
            if(this.authService.isEmailVerified == false)
            {
              this.authService.SendVerificationMail(); // gởi mail xác nhận
              this.authService.presentLoading("Vui lòng chờ...", 1900)
              this.router.navigate(['verify-email']);
            }
            else
            {
              alert("Địa chỉ email này đã đăng được đăng ký rồi, vui lòng qua mục quên mật khẩu rồi nhập emai này vào để quên mật khẩu")
            }
          })
        }
        else
        {
          alert('Mật khẩu bạn nhập lại chưa trùng với mật khẩu!')
        }
      }
      else
      {
        alert('Mật khẩu của bạn cần phải lớn hơn 5 kí tự!')
      }
    }
    else
    {
      alert('Bạn cần nhập đầy đủ các thông tin!')
    }
  }
}
