import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { WelcomPage } from '../chonchucvu/welcom.page'
import { AuthenticationService } from '../shared/authenticatin-Service'
import { error } from 'protractor';
import { VerifyEmailPage } from '../verify-email/verify-email.page';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/page_login/shared/modUser';

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
    public welcomePage : WelcomPage,
    public afStore : AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    ) {
    
      
    }

  ngOnInit() {
     // đọc dữ liệu từ firebase tên 'listuser' sau đó gán vào this.arrayUser
     return this.afStore.collection('listuser').valueChanges().subscribe(res=>{this.arrayUser = res})
    }
  //
  getNhomatkhau(event)
  {
    this.nhomatkhau = event.detail.checked
  }

  //chức đăng nhập vẫn chưa hoàn thiện, vì khi người dùng không xác nhận email đăng ký thì vẫn đăng nhập được, sẽ tìm cách fix sau
  /**
   * Đầu tiên mình kiểm tra các điều kiện như nhập đủ chưa, có để trống ô nào không
   * Tiếp theo gọi hàm signInWithEmailAndPassword(email, password) thực hiện đăng nhập
   *    nếu thực hiện được{
   *      chạy vòng lặp lấy ra được listuser(firebase) để so sánh : (khi vào đây tức là email và password đã đúng)
   *       +email(nhập vào) = email(firebase) và chucvu(firebase) = "daotao" thì chuyển đến trang của đào tạo
   *        và sau đó lưu chucvu lên local để qua app-routing mình so sánh tiếp (qua đó coi sẽ biết),
   *        congtacsinhvien cũng tương tự như daotao.
   *        giangvien thì mình sẽ lưu thêm magiangvien lên local cũng để qua app-routing so sánh luôn.
   * }
   *    không thực hiện được {
   *      mình sẽ dịch lỗi từ tiếng anh sang tiếng việt và alert ra cho người dùng đọc.
   * }
   * 
   */
  logIn()
  {
    if((this.email && this.password) != "")
    {
      this.ngFireAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((res)=>
      {
        // thực hiện set user đăng nhập lên firebase nếu người dùng vừa đăng ký

        // vòng lặp for sẽ duyệt qua các phần tử trong mangUser, chỉ cần khi nào thấy đúng thì nó làm
        // vd: sai sai dung => làm, sai dung sai => làm, nhưng sai sai sai => không làm
        for(let user of this.arrayUser) 
        {
          let e = user.email
          let cv = user.chucvu
          let mgv = user.magiangvien
          
          if(this.email == e && cv == "daotao") // neu email nhap vao = e (firebase) và chucvu(firebase) = 'daotao' => page dao tao
          {                                   // khi nguoi dung dang ky => chucvu đã lưu trên firebase roi nen khong can co dieu kien cho this.chucvu
            localStorage.setItem('chucvu', 'daotao') // luu vao bo nho local với key là chucvu giá trị là 'daotao'
            localStorage.setItem('isLogged', 'true') // lưu người dùng đã đăng nhập lên local
            this.authService.presentLoading('Vui lòng chờ...', 1800);
            this.router.navigate(['tabs/tabs/tab1'])
          }
          else if(this.email == e && cv == 'giangvien')
          {
            // set chucvu va magiangvien lên local mục đích qua app_routing_module để so sánh(cứ qua coi là rõ)
            localStorage.setItem('chucvu', 'giangvien')
            localStorage.setItem('magiangvien', mgv)
            this.authService.presentLoading('Vui lòng chờ...', 1800)
            this.router.navigate(['thoikhoabieu'])
          }
          else if(this.email == e && cv == 'congtacsinhvien')
          {
            localStorage.setItem('chucvu', 'congtacsinhvien')
            this.authService.presentLoading('Vui lòng chờ...', 1800);
            this.router.navigate(['chonmon'])
          }
          // vào vòng lặp for này tức là email và password đã đúng rồi vì đã qua hàm signInWithEmailAndPassword()
          //nếu click nhớ mật khẩu thì mình gán giá trị cho local
        }     
        // đăng nhập thành công thì thực hiện ghi nhớ mật khẩu 
        if(this.nhomatkhau == true)
        {
          localStorage.setItem('email', this.email)
          localStorage.setItem('password', this.password)
        }
        // nếu không click nhơ mật khẩu thì mình xóa giá trị lưu trên local  
        else if(this.nhomatkhau == false)
        {
          localStorage.setItem('email', '')
          localStorage.setItem('password', '')
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
