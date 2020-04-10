import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phangiohoc',
  templateUrl: './phangiohoc.page.html',
  styleUrls: ['./phangiohoc.page.scss'],
})
export class PhangiohocPage implements OnInit {

  hocky = ''
  tenlop = ''
  magv = ''
  mamh = ''
  hk = ''
  tenmonhoc = ''
  tengiangvien = ''
  tenphonghoc = ''
  ngaybatdau = ''
  ngayketthuc = ''
  giobatdau = ''
  gioketthuc = ''
  mangngayhoc : any = []
  listphonghoc : any
  ngayhoc = '' // de view ra ben .html, detai : dong 117

  listmonhoc : any
  listlop : any
  showChonmonChongiangvien : boolean = true
  viewngayhocsaukhixoa : boolean = false

  listngayhoc : any = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']
  constructor(
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase,
    public router : Router
  ) { 
     //gan gia tri 
     this.hocky = this.authService.getHocky()
     this.tengiangvien = this.authService.getMsgv()
     this.hk = this.hocky.slice(2) // cat tu vi tri thu 2 lay het phan tu con lai
   
  }

  ngOnInit() {
    // lay gia tri tren firbase gan cho listmonhoc va listgiangvien
    this.afDB.list('danhsachmonhoc').valueChanges().subscribe(res=>this.listmonhoc = res)
    this.afDB.list('danhsachlop').valueChanges().subscribe(res=>this.listlop=res)
    this.afDB.list('danhsachphonghoc').valueChanges().subscribe(res=>this.listphonghoc=res)

    
  }
  getTenlop(event)
  {
    this.tenlop = event.detail.value
  }
  getTenmh(event)
  {
    this.tenmonhoc = event.detail.value
  }
  getTenphonghoc(event)
  {
    if((this.tenlop && this.tenmonhoc) == '')
    {
      this.authService.presentAlert4('Vui lòng chọn lớp và môn học trước !')
    }
    else
    {
      this.tenphonghoc = event.detail.value
      this.showChonmonChongiangvien = false // set = false de ion-list chứa chọn môn và chọn giảng viên đóng lại, chi tiết xem bên html tai dong 25
    }
  }
  getNgayhoc(event)
  {
   
    // get gia tri va push vao mang ngayhoc
    let nh = event.detail.value
    this.mangngayhoc.push(nh)
     // gan gia tri de view ra html, dong 117
     this.ngayhoc += nh + " "   
    
  }
  clickIcon()
  {
    this.showChonmonChongiangvien = !this.showChonmonChongiangvien // nghich dao checkshow
    this.tenmonhoc = ''  // xoa ten mon hoc
    this.tenphonghoc = ''
    this.tenlop = ''
  }
  TiepTuc()
  {
    // kiem tra coi co bi rong hay khong?
    if((this.hk && this.tenlop && this.tenmonhoc && this.tengiangvien && this.ngaybatdau 
      && this.ngayketthuc && this.giobatdau && this.gioketthuc
      && this.mangngayhoc) != '')
    {
      //set gia tri len authentication-Service
      this.authService.setMalop(this.tenlop)
      this.authService.setMsmh(this.tenmonhoc)
      this.authService.setPhonghoc(this.tenphonghoc)
      this.authService.setNgaybatdau(this.ngaybatdau.slice(0, 10)) // cat tu ki tu 0 den 10
      this.authService.setNgayketthuc(this.ngayketthuc.slice(0, 10))
      this.authService.setGiobatdau(this.giobatdau.slice(11, 16)) // cat tu ki tu 11 den 16
      this.authService.setGioketthuc(this.gioketthuc.slice(11, 16))
      this.authService.setNgayhoc(this.mangngayhoc) 
      //chuyen trang
      this.router.navigate(['thongtinphangio'])    
    }
    else
    {
      this.authService.presentAlert4('Bạn vui lòng chọn đầy đủ các thông tin !')
    }
  }
  
}
