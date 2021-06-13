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
import { BehaviorSubject } from 'rxjs';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  // set và get giá trị mới nhất nhật cho magiangvien
  private magv_bandau = new BehaviorSubject('rỗng') //BehaviorSubject hàm chứa (lưu) tất cả giá trị số, chữ, mảng, ...
  changeMaGV(mgv : string)
  {
    this.magv_bandau.next(mgv)
  }
  getMagv_hientai = this.magv_bandau.asObservable() //asObservable lấy ra giá trị mới nhất của magv_bandau nếu thay đổi

  //
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
  ngaydiemdanh : string = ''
  ngayhoc : any = []
  phonghoc = ''
  email = ''
  listthoikhoabieu  = []
  tuPagedangnhapqua = false
  tenmonhoc = ''
  listThongtinvanghoc = []
  autoID = 0

  arrayUser : any 
  // tạo mảng user
  public userData: any;
  // getter and setter
  setListthongtinvanghoc(lvh : any)
  {
    this.listThongtinvanghoc = lvh
  }
  getListthongtinvanghoc()
  {
    return this.listThongtinvanghoc
  }
  setTenmonhoc(tmh : string)
  {
    this.tenmonhoc = tmh
  }
  getTenmonhoc()
  {
    return this.tenmonhoc
  }
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
  setTengiangvien(tengv : string)
  {
    this.tengiangvien = tengv
  }
  getTengiangvien()
  {
    return this.tengiangvien
  }
  setListTKB(list : [])
  {
    this.listthoikhoabieu = list
  }
  getListTKB()
  {
    return this.listthoikhoabieu
  }
  setNgaydiemdanh(ndd : string)
  {
    this.ngaydiemdanh = ndd
  }
  getNgaydiemdanh()
  {
    return this.ngaydiemdanh
  }
  setTuPagedangnhapqua(tpdnq : boolean)
  {
    this.tuPagedangnhapqua = tpdnq
  }
  getTuPagedangnhapqua()
  {
    return this.tuPagedangnhapqua
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
    this.getAutoID()
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
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'OK',
          handler: () => {
            this.router.navigate([trangmuonchuyenden])
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
   // toast
   async presentToast(msg : string, thoigianToast : number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: thoigianToast
    });
    toast.present();
  }
  
  // Đăng ký 
  RegisterUser(email, password) {
    return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password).then((result) => {
        //this.SendVerificationMail(); // gởi mail xác nhận
        this.presentToast('Bạn đã đăng ký tài khoản thành công', 2500)
        this.router.navigate(['dangnhap']);
        // set user lên firebase
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
    return this.ngFireAuth.auth.currentUser.sendEmailVerification()
  }

  // Quên mật khẩu
 PasswordRecover(passwordResetEmail) {
  return this.ngFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
  .then(() => {
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
  })
}
  SetUserData(user)
  {
    this.chucvu = this.getChucvu()
    if(this.getMagiangvien() == '')
    {
      this.magiangvien = 'null'
    }
    else
    {
      this.magiangvien = this.getMagiangvien()
    }
    // model dang ky
    let modelRegisterUser = {
      id : this.autoID,
      email : user.email,
      chucvu : this.chucvu,
      magiangvien : this.magiangvien
    }
    // set data to firebase
    this.afStore.doc(`listuser/${this.autoID}`).set(modelRegisterUser)
  }

  getAutoID()
  {
    this.afStore.collection('listuser').valueChanges().subscribe(res => {
      let listuser = []
      listuser.push(res)
      for (let lu of listuser)
      {
        this.autoID = lu.length
      }
    })
  }

  // đăng xuất và xóa user ra khỏi mảng
  SignOut() {
    return this.ngFireAuth.auth.signOut().then(() => {
      // xóa user, email, password và isLogged, magiangvien lưu ở local (xóa tất cả)
      localStorage.clear()
      // chuyển màn hình
      this.router.navigate(['dangnhap']);
    })
  }

}