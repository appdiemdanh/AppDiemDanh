import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { ChonchucvuPage } from '../chonchucvu/chonchucvu.page'
import { AuthenticationService } from '../../shared/authenticatin-Service'
import { error } from 'protractor';
import { QuenmatkhauPage } from '../quenmatkhau/quenmatkhau.page';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/shared/modUser';

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.page.html',
  styleUrls: ['./dangnhap.page.scss'],
})
export class DangnhapPage implements OnInit {

  email = ''
  password = ''
  nhomatkhau : boolean = true
  arrayUser : any = []

  constructor(
    public navCtrl : NavController,
    public router : Router,
    public authService : AuthenticationService,
    public loadingController : LoadingController,
    public chonchucvuPage : ChonchucvuPage,
    public afStore : AngularFirestore,
    public ngFireAuth: AngularFireAuth
    ) {}

  ngOnInit() {
     // đọc dữ liệu từ firebase tên 'listuser' sau đó gán vào this.arrayUser
     return this.afStore.collection('listuser').valueChanges().subscribe(res=>{this.arrayUser = res})
    }

  getNhomatkhau(event)
  {
    this.nhomatkhau = event.detail.checked
  }

  //chức đăng nhập vẫn chưa hoàn thiện, vì khi người dùng không xác nhận email đăng ký thì vẫn đăng nhập được, sẽ tìm cách fix sau
  /**
   * Đầu tiên mình kiểm tra các điều kiện như nhập đủ chưa, có để trống ô nào không
   * Tiếp theo gọi hàm signInWithEmailAndPassword(email, password) thực hiện đăng nhập
   *    nếu thực hiện được{
   *    + nếu arrayUser thứ i có email == email người dùng nhập thì tiến hành set giá trị lên bộ nhớ máy(local) // qua app-routing module sẽ rõ mục đích
   *    + sau đó so sánh coi arrayUser thứ i đó có chucvu là gì thì chuyển đến trang hợp lí
   *    + riêng giảng viên thì có thêm magiangvien thì mình set lên bộ nhớ máy(local) và set qua authService.ts // qua thoikhoabieu.ts sẽ rõ mục đích
   * }
   *    không thực hiện được {
   *      mình sẽ dịch lỗi từ tiếng anh sang tiếng việt và alert ra cho người dùng đọc.
   * }
   */
  logIn()
  {
    if((this.email && this.password) != "")
    {
      this.ngFireAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((res)=>
      {
        this.authService.setTuPagedangnhapqua(true) // qua thoikhoabieu.ts sẽ hiểu
        for (let i = 0; i < this.arrayUser.length; i ++) 
        {
          if(this.arrayUser[i].email == this.email)
          {
            localStorage.setItem('chucvu', this.arrayUser[i].chucvu)
            localStorage.setItem('isLogged', "true")
            // so sánh chức vụ để chuyển đến trang của chức vụ đó
            if (this.arrayUser[i].chucvu == 'daotao')
            {
              this.router.navigate(['tabs'])
              this.authService.presentLoading('Vui lòng chờ...', 1300)
            }
            else if (this.arrayUser[i].chucvu == 'giangvien')
            {
              localStorage.setItem('magiangvien', this.arrayUser[i].magiangvien)
              this.authService.changeMaGV(this.arrayUser[i].magiangvien + "")
              this.router.navigate(['thoikhoabieu'])
            }
            else // cong tac sv
            {
              this.router.navigate(['tabs_ctsv'])
              this.authService.presentLoading('Vui lòng chờ...', 1300)
            }  
          }
        }     
        // đăng nhập thành công thì thực hiện ghi nhớ mật khẩu
        //nếu click nhớ mật khẩu thì mình gán giá trị cho local 
        if(this.nhomatkhau == true)
        {
          localStorage.setItem('email', this.email)
          localStorage.setItem('password', this.password)
        }
        // nếu không click nhơ mật khẩu thì mình xóa giá trị lưu trên local  
        else if(this.nhomatkhau == false)
        {
          localStorage.removeItem('email')
          localStorage.removeItem('password')
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
      this.authService.presentAlert4('Bạn chưa nhập đầy đủ thông tin!')
    } 
  }


  
}
