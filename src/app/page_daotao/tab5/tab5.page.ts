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
    // lay gia tri tren fire base gan cho listhocky va listgiangvien
    this.afDB.list('danhsachhocky').valueChanges().subscribe(res=>this.listhocky=res)
    this.afDB.list('danhsachgiangvien').valueChanges().subscribe(res=>this.listgiangvien=res)
  }
  
  getHocky(event)
  {
    this.hocky = event.detail.value
  }
  getGiangvien(event)
  {
    let tenvamaGV = event.detail.value // tao mang hung gia tri tu event
    this.tengiangvien = tenvamaGV.split("-")[0] // = tenvamaGV cat ra boi dau '-' se tao ra mang voi 2 phan tu thu 0 va thu 1 cua mang do
    this.magiangvien  = tenvamaGV.split("-")[1].slice(1) // thu 0 la tengiangvien, thu 1 la magiangvien
    /**
     * tại sao lại split("-") rồi lại slice(1):
     * vì tenvamaGV trả ra: tengiangvien - magiangvien 
     * split("-") là lọc phần tử nếu phân chia nhau bởi dấu "-", khi đó trước magiangvien sẽ có 1 dấu cách
     * thì tui dùng slice(1) là cắt dấu cách đó (slice(1) cắt từ phần tử thứ 1 cho đến hêt)
     */
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
        this.authService.setMsgv(this.tengiangvien)
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
