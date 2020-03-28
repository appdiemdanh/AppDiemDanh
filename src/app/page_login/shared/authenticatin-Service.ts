import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from "./modUser";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  chucvu : string = ''
  arrayUser : any 
  // getter and setter
  getChucvu()
  {
    return this.chucvu
  }
  setChucvu(cv : string)
  {
    this.chucvu = cv
  }

  // tạo mảng user
  public userData: any;

  // add các function muốn sử dụng vào constructor
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    public alert : AlertController ,
    public loadingController : LoadingController,
    public afDB : AngularFireDatabase
  ) {
    // kiểm tra xem có user trên database hay chưa
    this.ngFireAuth.authState.subscribe(user => {
      if (user) 
      {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData)); // set gia tri cho user tren firebase
        JSON.parse(localStorage.getItem('user')); // chuyển chuỗi thành json
      } 
      else 
      {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
      // đọc dữ liệu từ firebase tên 'listuser' sau đó gán vào this.arrayUser
      return this.afStore.collection('listuser').valueChanges().subscribe(res=>{this.arrayUser = res})
    })
  }
  

  //thong bao
  async presentAlert(title : String, msg : String, trangmuonchuyenden : String) {
    const alert = await this.alert.create({
      header: title + "",
      message: msg + "",
      buttons: [
        {
          text: 'Chưa nhận',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
           
          }
        }, {
          text: 'Đã nhận',
          handler: () => {
            this.router.navigate([trangmuonchuyenden])
            console.log(trangmuonchuyenden);
          }
        }
      ]
    });

    await alert.present();
  }

  //thong bao 2
  async presentAlert2(title : String, msg : String, trangchuyenden : String, buttonOk : String,) {
    const alert = await this.alert.create({
      header: title + "",
      message: msg + "",
      buttons: [
        {
          text: buttonOk + "",
          handler: () => {
            this.router.navigate([trangchuyenden])
          }
        }
      ]
    });

    await alert.present();
  }
  //loading
  async presentLoading(msg : string, miligiay : number) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: miligiay
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  // Đăng nhập
  /*
  SignIn(email, password) {
    return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password)
  }
  */ //đăng nhập, và setdata người dùng vào trên firebase

  //SignIn(email, password) {
    //return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password).catch((error) => {
    //console.log(error)
  //})
//}
  SignIn(email, password) {
    return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password)
  }

  // Đăng ký 
  RegisterUser(email, password) {
    return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password).then((result) => {
      this.SetUserData(result.user);
    }).catch((error)=>{
      console.log("lỗi"+error)
    })
  }

  // gửi tin nhắn xác nhận qua gmail
  SendVerificationMail() {
    // trả về tin nhắn sau đó chuyển màn hình
    return this.ngFireAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  //reset password
  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }
  // Quên mật khẩu
  /*
  PasswordRecover(email, actioncode) {
    return this.ngFireAuth.auth.sendPasswordResetEmail(email, actioncode)
    .then(() => {
    }).catch((error) => {
      console.log("Lỗi" + error)
    })
  }
  */
 PasswordRecover(passwordResetEmail) {
  return this.ngFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
  .then(() => {
    //window.alert('Chúng tôi đã gửi 1 tin nhắn đến gmail của bạn, vui lòng kiểm tra hộp thư đến');
    this.presentAlert("Thông báo", "Chúng tôi đã gửi 1 tin nhắn đến gmail của bạn, vui lòng kiểm tra hộp thư đến", "dangnhap")
  }).catch((error) => {
    if(error == "Error: The email address is badly formatted.")
    {
      alert('Email định dạng sai')
    }
    else if(error == "Error: There is no user record corresponding to this identifier. The user may have been deleted.")
    {
      alert('Email bạn nhập không đúng, bị khóa hoặc chưa đăng ký')
    }
    //alert(error)
  })
}

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));// chuyển đổi json thành chuỗi và gán vào biến user
    return (user !== null && user.emailVerified !== false) ? true : false; // user khác rỗng và emailFerfied trong list user khác false thì trả về true ngược lại trả về false
  }

  //public User = JSON.parse(localStorage.getItem('user'));
  //public emailVerified = false
  // Returns true when user's email is verified (đã xác minh rồi)
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    this.getChucvu()
    return this.AuthLogin(new auth.GoogleAuthProvider())
  }

  // Auth providers
  AuthLogin(provider) {
    this.getChucvu()
    return this.ngFireAuth.auth.signInWithPopup(provider) // xác thực người dùng
    .then((result) => {  //(result : kết quả)
      if(this.chucvu == "daotao")
      {
        this.presentLoading("Vui lòng chờ...", 1900)
        this.router.navigate(['tabs/home'])
      }
      else if(this.chucvu == "giangvien")
      {
        console.log(this.chucvu)
      }
      else if(this.chucvu == "congtacsinhvien")
      {
        console.log(this.chucvu)
      }
      //khoi setuser nha
    }).catch((error) => {
      console.log('Lỗi ' + error)
    })
  }

  // set du lieu cho mang user 
  SetUserData(user) {
    this.chucvu = this.getChucvu()
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`listuser/${user.uid}`);

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      chucvu : this.chucvu,
      photoURL: user.photoURL,
      emailVerified: true//user.emailVerified
    }
    return userRef.set(userData, {
      merge: true //set gia tri trong database cua firebase
    })
  }

  // đăng xuất và xóa user ra khỏi mảng
  SignOut() {
    return this.ngFireAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['dangnhap']);
    })
  }

}