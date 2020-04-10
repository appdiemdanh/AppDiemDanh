import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

import { Router } from '@angular/router';
import { WelcomPage } from '../chonchucvu/welcom.page'
import { AuthenticationService } from '../shared/authenticatin-Service'
import { error } from 'protractor';
import { VerifyEmailPage } from '../verify-email/verify-email.page';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.page.html',
  styleUrls: ['./dangnhap.page.scss'],
})
export class DangnhapPage implements OnInit {

  public email = ''
  public password = ''
  arrayUser : any = ''

  constructor(
    public navCtrl : NavController,
    public router : Router,
    public authService : AuthenticationService,
    public loadingController : LoadingController,
    public welcomePage : WelcomPage,
    public afStore : AngularFirestore
    ) { 
    }

  ngOnInit() {
     // đọc dữ liệu từ firebase tên 'listuser' sau đó gán vào this.arrayUser
     return this.afStore.collection('listuser').valueChanges().subscribe(res=>{this.arrayUser = res})
  }

  logIn()
  {
    let e, cv //email và chức vụ
    let mangUser = this.arrayUser
      if((this.email && this.password) != "")
      {
          this.authService.SignIn(this.email, this.password).then((res)=>
          {
            for(let user of mangUser)  //cac phan tu chi duoc tra ra het khi nam trong vòng lặp for này
            {                           // neu nam ngoai vong lap for thi chi tra ra phan tu cuoi cua mang
              e = user.email
              cv = user.chucvu
              //console.log(e)
              //console.log(cv)
              if(this.email == e && cv == "daotao") // neu email nhap vao = e (firebase) và chucvu(firebase) = 'daotao' => page dao tao
              {                                   // khi nguoi dung dang ky => chucvu đã lưu trên firebase roi nen khong can co dieu kien cho this.chucvu
              this.authService.presentLoading('Vui lòng chờ...', 2500);
              this.router.navigate(['tabs/tab1'])
              console.log('Đăng nhập thành công')
              }
              if(this.email == e && cv == 'giangvien')
              {
                this.authService.presentLoading('Vui lòng chờ...', 2500)
                this.router.navigate(['diemdanh'])
                console.log('Đăng nhập thành công')
              }
              if(this.email == e && cv == 'congtacsinhvien')
              {
                this.authService.presentLoading('Vui lòng chờ...', 2500);
                this.router.navigate(['chonmon'])
                console.log('Đăng nhập thành công')
              }
              else{
                console.log('Đăng nhập thất bại')
              }
            }
          }).catch(error=>{
            //so sanh loi phat ra tu error rồi dịch ra tiếng việt cho dễ hiểu 
            if(error == 'Error: The email address is badly formatted.')
            {
              this.authService.presentAlert4('email định dạng sai')
            }
            else if(error == 'Error: There is no user record corresponding to this identifier. The user may have been deleted.')
            {
              this.authService.presentAlert4('Email bạn nhập không đúng, chưa đăng ký hoặc bị khóa')
            }
            else if(error == 'Error: The password is invalid or the user does not have a password.')
            {
              this.authService.presentAlert4('Mật khẩu không đúng')
            }
          })
          //
      }
      else
      {
        alert('Bạn chưa nhập đầy đủ thông tin!')
      }
  }

}
