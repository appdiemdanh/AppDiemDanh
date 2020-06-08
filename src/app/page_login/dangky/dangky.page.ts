import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authenticatin-Service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.page.html',
  styleUrls: ['./dangky.page.scss'],
})
export class DangkyPage implements OnInit {

  magiangvien = ''
  mabaomat = ''
  email = ''
  password = ''
  repassword = ''
  chucvu = ''
  arraymabaomat : any = []
  mabaomatFirebase = ''

  constructor(
    public router : Router,
    public authService : AuthenticationService,
    public afStore : AngularFirestore ,
    public afDB : AngularFireDatabase
  ) { 
    this.chucvu = this.authService.getChucvu()
    if(this.chucvu == '')
    {
      this.authService.presentAlert2("Thông báo", "Xin lỗi vì sự bất tiện này, Vui lòng chọn lại chức vụ của bạn.", "chonchucvu", "OK, Chọn chức vụ")
    }
  }

  ngOnInit() {
    this.afDB.list('mabaomat').valueChanges().subscribe(res=>{
      this.arraymabaomat = res
      for(let mbm of this.arraymabaomat)
      {
        this.mabaomatFirebase = mbm
      }
    })
  }


  signUp()
  {
    // chuc vu là daotao hoac congtacsinhvien
    if(this.chucvu == 'daotao' || this.chucvu == 'congtacsinhvien')
    {
      if((this.email && this.password && this.repassword && this.mabaomat).length != 0) // input khong rong
      {
        if(this.password.length >= 6) // password >= 6
        {
          if(this.repassword == this.password) // nhap lai mat khau phai dung
          {
            if(this.mabaomat == this.mabaomatFirebase)
            {
              this.authService.RegisterUser(this.email, this.password)
            }
            else
            {
              this.authService.presentAlert4('Mã bảo mật bạn nhập chưa chính xác')
            }
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
    // chuc vu la giangvien
    else if(this.chucvu == 'giangvien')
    {
      if((this.email && this.password && this.repassword && this.magiangvien).length != 0) // input khong rong
      {
        if(this.password.length >= 6) // password >= 6
        {
          if(this.repassword == this.password) // nhap lai mat khau phai dung
          {
            if (this.mabaomat == this.mabaomatFirebase)
            {
              localStorage.setItem('magiangvien', this.magiangvien) // luu mã giảng viên lên local
              this.authService.RegisterUser(this.email, this.password)
            }
            else
            {
              this.authService.presentAlert4('Mã bảo mật bạn nhập chưa chính xác')
            }
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

}