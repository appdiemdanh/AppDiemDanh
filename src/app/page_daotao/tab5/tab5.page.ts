import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tab4Page } from '../tab4/tab4.page';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  myday = new Date()

  listhocky : any
  listgiangvien : any
  hocky = ''
  tengiangvien = ''
  magiangvien = ''
  dadangnhap = ''

  constructor(
    public tab4 : Tab4Page,
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase,
    public router : Router
    ) { 
     
     }


  ngOnInit() {
    this.getDanhsachhocky()
    this.getDanhsachgiangvien()
  }

  getDanhsachhocky()
  {
    this.afDB.list('danhsachhocky').valueChanges().subscribe(res => {
      this.listhocky = []  
      this.listhocky = res
    })
  }
  getDanhsachgiangvien()
  {
    this.afDB.list('danhsachgiangvien').valueChanges().subscribe(res => {
      this.listgiangvien = []
      this.listgiangvien = res
    })
  }
  
  getHocky(event)
  {
    this.hocky = event.detail.value
  }
  getTenGiangvien(event)
  {
    this.tengiangvien = event.detail.value
    this.getMagiangvien()
  }
  getMagiangvien()
  {
    this.afDB.list('danhsachgiangvien').valueChanges().subscribe(res =>
      {
        let listgiangvien : any = res
        for (let gv of listgiangvien)
        {
          if (gv.C == this.tengiangvien)
          {
            this.magiangvien = gv.B
          }
        }
      })
  }

  nextPage()
  {
     // lấy giá trị isLogge lưu từ local(được lưu bới page dangnhap)
     this.dadangnhap = localStorage.getItem('isLogged')
     // Kiểm tra người dùng chọn hết đủ chưa
    if((this.hocky && this.tengiangvien) != '')
    {
      // người dùng đã đăng nhập
      if(this.dadangnhap == "true")
      {
         //set gia tri 
        this.authService.setHocky(this.hocky)
        this.authService.setTengiangvien(this.tengiangvien)
        this.authService.setMagiangvien(this.magiangvien)
        //chuyen man hinh
        this.router.navigate(['phangiogiang'])
      }
      // chưa đăng nhập
      else
      {
        this.authService.presentAlert3("Thông báo ", "Vui lòng đăng nhập để tiếp tục!", "dangnhap")
      }
    }
    else
    {
      this.authService.presentAlert4('Bạn vui lòng chọn đầy đủ thông tin học kỳ và giảng viên !')
    }
  }

  // logout
  logOut()
  {
    this.authService.SignOut().then((res)=>{
    }).catch((error)=>{
      console.log(error)
    })
  }
 


}
