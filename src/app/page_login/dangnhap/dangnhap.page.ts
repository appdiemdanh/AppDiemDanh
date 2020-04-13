import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { WelcomPage } from '../chonchucvu/welcom.page'
import { AuthenticationService } from '../shared/authenticatin-Service'
import { error } from 'protractor';
import { VerifyEmailPage } from '../verify-email/verify-email.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

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
    public afStore : AngularFirestore,
    public ngFireAuth: AngularFireAuth
    ) {
    }

  ngOnInit() {
     // đọc dữ liệu từ firebase tên 'listuser' sau đó gán vào this.arrayUser
     return this.afStore.collection('listuser').valueChanges().subscribe(res=>{this.arrayUser = res})
  }

  /**
   * chức đăng nhập vẫn chưa hoàn thiện, vì khi người dùng không xác nhận email đăng ký thì vẫn đăng nhập được
   * 
   * sẽ tìm cách fix sau
   */
  logIn()
  {
    let e, cv, mgv //email và chức vụ
    let mangUser = this.arrayUser
      if((this.email && this.password) != "")
      {
        this.ngFireAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((res)=>
        {
          // vòng lặp for sẽ duyệt qua các phần tử trong mangUser, chỉ cần khi nào thấy đúng thì nó làm
          // vd: sai sai dung => làm, sai dung sai => làm, nhưng sai sai sai => không làm
          for(let user of mangUser) 
          {
            e = user.email
            cv = user.chucvu
            mgv = user.magiangvien

            if(this.email == e && cv == "daotao") // neu email nhap vao = e (firebase) và chucvu(firebase) = 'daotao' => page dao tao
            {                                   // khi nguoi dung dang ky => chucvu đã lưu trên firebase roi nen khong can co dieu kien cho this.chucvu
            this.authService.presentLoading('Vui lòng chờ...', 2500);
            this.router.navigate(['tabs/tab1'])
            }
            if(this.email == e && cv == 'giangvien')
            {
              this.authService.setMagiangvien(mgv)
              this.authService.presentLoading('Vui lòng chờ...', 2500)
              this.router.navigate(['thoikhoabieu'])
            }
            if(this.email == e && cv == 'congtacsinhvien')
            {
              this.authService.presentLoading('Vui lòng chờ...', 2500);
              this.router.navigate(['chonmon'])
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
      }
      else
      {
        alert('Bạn chưa nhập đầy đủ thông tin!')
      }
  }

}
