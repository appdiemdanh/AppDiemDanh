import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authenticatin-Service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.page.html',
  styleUrls: ['./dangky.page.scss'],
})
export class DangkyPage implements OnInit {

  magiangvien = ''
  email = ''
  password = ''
  repassword = ''

  chucvu = ''
  arrayEmail : any

  constructor(
    public router : Router,
    public authService : AuthenticationService,
    public afStore : AngularFirestore 
  ) { 
    this.chucvu = this.authService.getChucvu()
    if(this.chucvu == '')
    {
      this.authService.presentAlert2("Thông báo", "Xin lỗi vì sự bất tiện này, Vui lòng chọn lại chức vụ của bạn.", "chonchucvu", "OK, Chọn chức vụ")
    }
  }

  ngOnInit() {
    this.afStore.collection('listuser').valueChanges().subscribe(res=>this.arrayEmail=res)
  }


  signUp()
  {
    // cac dieu kien de dang ky tai khoan moi
    if((this.email && this.password && this.repassword).length != 0) // input khong rong
    {
      if(this.password.length >= 6) // password >= 6
      {
        if(this.repassword == this.password) // nhap lai mat khau phai dung
        {
          this.authService.RegisterUser(this.email, this.password).then(res=>{
            this.authService.setMagiangvien(this.magiangvien) // set magiangvien len authService
          })
        }
        else
        {
          this.authService.presentAlert4('Mật khẩu bạn nhập lại chưa trùng với mật khẩu!')
        }
      }
      else
      {
        this.authService.presentAlert4('Mật khẩu của bạn cần phải lớn hơn 5 kí tự!')
      }
    }
    else
    {
      this.authService.presentAlert4('Bạn cần nhập đầy đủ các thông tin!')
    }
  }

}