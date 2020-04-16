import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from "./modUser";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { phangiogiang } from './modPhangio'


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  chucvu : string = ''
  magiangvien : string = ''
  mssv : string = ''
  msgv : string = ''
  tengiangvien : string = ''
  msmh : string = ''
  mslop : string = ''
  tongsv : string = ''
  hocky : string = ''
  ngaybatdau : string = ''
  ngayketthuc : string = ''
  giobatdau : string = ''
  gioketthuc : string = ''
  ngayhoc : any = []
  phonghoc = ''
  email = ''
  id : number
  issend : boolean = false
  listsvdihoc = []
  listsvvanghoc = []
  listthoikhoabieu  = []

  arrayUser : any 
  // tạo mảng user
  public userData: any;
  // getter and setter
  setChucvu(cv : string)
  {
    this.chucvu = cv
  }
  getChucvu()
  {
    return this.chucvu
  }
  setMagiangvien(mgv : string) // cua ben page dang ky 
  {
    this.magiangvien = mgv
  }
  getMagiangvien()// cua ben page dang ky 
  {
    return this.magiangvien
  }
  setMssv(mssv : string)
  {
    this.mssv = mssv
  }
  getMssv()
  {
    return this.mssv
  }
  setMsgv(msgv : string)
  {
    this.msgv = msgv
  }
  getMsgv()
  {
    return this.msgv
  }
  setMsmh(msmh : string)
  {
    this.msmh = msmh
  }
  getMsmh()
  {
    return this.msmh
  }
  setMalop(msl : string)
  {
    this.mslop = msl
  }
  getMalop()
  {
    return this.mslop
  }
  setHocky(hk : string)
  {
    this.hocky = hk
  }
  getHocky()
  {
    return this.hocky
  }
  setNgaybatdau(nbd : string)
  {
    this.ngaybatdau = nbd
  }
  getNgaybatdau()
  {
    return this.ngaybatdau
  }
  setNgayketthuc(nkt : string)
  {
    this.ngayketthuc = nkt
  }
  getNgayketthuc()
  {
    return this.ngayketthuc
  }
  setGiobatdau(gbd : string)
  {
    this.giobatdau = gbd
  }
  getGiobatdau()
  {
    return this.giobatdau
  }
  setGioketthuc(gkt : string)
  {
    this.gioketthuc = gkt
  }
  getGioketthuc()
  {
    return this.gioketthuc
  }
  setNgayhoc(nh : any)
  {
    this.ngayhoc = nh
  }
  getNgayhoc()
  {
    return this.ngayhoc
  }
  setPhonghoc(ph : string)
  {
    this.phonghoc = ph
  }
  getPhonghoc()
  {
    return this.phonghoc
  }
  setEmail(em : string)
  {
    this.email = em
  }
  getEmail()
  {
    return this.email
  }
  setListdihoc(lsv : [])
  {
    this.listsvdihoc = lsv
  }
  getListdihoc()
  {
    return this.listsvdihoc
  }
  setListvanghoc(lsv : [])
  {
    this.listsvvanghoc = lsv
  }
  getListvanghoc()
  {
    return this.listsvvanghoc
  }
  setID(id : number)
  {
    this.id = id
  }
  getID()
  {
    return this.id
  }
  setTengiangvien(tengv : string)
  {
    this.tengiangvien = tengv
  }
  getTengiangvien()
  {
    return this.tengiangvien
  }
  setIsSend(issend : boolean)
  {
    this.issend = issend
  }
  getIsSend()
  {
    return this.issend
  } 
  setListTKB(list : [])
  {
    this.listthoikhoabieu = list
  }
  getListTKB()
  {
    return this.listthoikhoabieu
  }

  // add các function muốn sử dụng vào constructor
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    public alert : AlertController ,
    public loadingController : LoadingController,
    public afDB : AngularFireDatabase,
    public toastController : ToastController
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
   //thong bao 3
   async presentAlert3(title : String, msg : String, trangmuonchuyenden : String) {
    const alert = await this.alert.create({
      header: title + "",
      message: msg + "",
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate([trangmuonchuyenden])
            console.log(trangmuonchuyenden);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }
  //thong bao 4
  async presentAlert4(msg : string) {
    const alert = await this.alert.create({
      header: 'Thông báo',
      message: msg,
      buttons: [
        {
          text : 'OK',
        }
      ],
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
    //console.log('Loading dismissed!');
  }

  // Đăng nhập
 
  SignIn(email, password) {
    return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password).then(res=>{
    })
  }

  // Đăng ký 
  RegisterUser(email, password) {
    return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password).then((result) => {
        this.SendVerificationMail(); // gởi mail xác nhận
        this.presentLoading("Vui lòng chờ...", 1900)
        this.router.navigate(['verify-email']);
      this.SetUserData(result.user);
    }).catch((error)=>{
      console.log("lỗi"+error)
      if(error == "Error: The email address is badly formatted.")
     {
      this.presentAlert4('Email định dạng sai')
      }
      if(error == "Error: The email address is already in use by another account.")
      {
        this.presentAlert3('Thông báo', 'Email này đã được đăng ký rồi, vui lòng qua trang quên mật khẩu để khôi phục lại mật khẩu mới', 'quenmatkhau')
      }
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

 PasswordRecover(passwordResetEmail) {
  return this.ngFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
  .then(() => {
    //window.alert('Chúng tôi đã gửi 1 tin nhắn đến gmail của bạn, vui lòng kiểm tra hộp thư đến');
    this.presentAlert("Thông báo", "Chúng tôi đã gửi 1 tin nhắn đến gmail của bạn, vui lòng kiểm tra hộp thư đến", "dangnhap")
  }).catch((error) => {
    if(error == "Error: The email address is badly formatted.")
    {
      this.presentAlert4('Email định dạng sai')
    }
    else if(error == "Error: There is no user record corresponding to this identifier. The user may have been deleted.")
    {
      this.presentAlert4('Email bạn nhập không đúng, bị khóa hoặc chưa đăng ký')
    }
    //alert(error)
  })
}

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));// chuyển đổi json thành chuỗi và gán vào biến user
    return (user !== null && user.emailVerified !== false) ? true : false; // user khác rỗng và emailFerfied trong list user khác false thì trả về true ngược lại trả về false
  }

  
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
        this.presentLoading("Vui lòng chờ...", 2500)
        this.router.navigate(['tabs/tab1'])
      }
      else if(this.chucvu == "giangvien")
      {
        this.presentLoading("Vui lòng chờ...", 2500)
        this.router.navigate(['thoikhoabieu'])
      }
      else if(this.chucvu == "congtacsinhvien")
      {
        this.presentLoading("Vui lòng chờ...", 2500)
        this.router.navigate(['chonmon'])
      }
      //khoi setuserData nha
    }).catch((error) => {
      console.log('Lỗi ' + error)
    })
  }

  // set du lieu cho mang user 
  SetUserData(user) {
    this.chucvu = this.getChucvu()
    if(this.getMagiangvien() == '')
    {
      this.magiangvien = 'null'
    }
    else
    {
      this.magiangvien = this.getMagiangvien()
    }
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`listuser/${user.uid}`);

    const userData: User = {
      uid           : user.uid,
      email         : user.email,
      displayName   : user.displayName,
      chucvu        : this.chucvu,
      magiangvien   : this.magiangvien,
      photoURL      : user.photoURL,
      emailVerified : user.emailVerified
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