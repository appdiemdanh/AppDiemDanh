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

  constructor(
    public router : Router,
    public authService : AuthenticationService // lớp này bên folder shared nha 
  ) { }

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
            this.authService.SendVerificationMail(); // gởi mail xác nhận
            this.router.navigate(['verify-email']);
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
