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
  malop = ''
  magv = ''
  mamh = ''
  hk = ''
  tenmonhoc = ''
  tengiangvien = ''
  ngaybatdau = ''
  ngayketthuc = ''
  giobatdau = ''
  gioketthuc = ''
  ngayhoc = [] = ''

  listmonhoc : any
  listgiangvien : any
  monhoctheohk : any
  checkshow : boolean = true

  listngayhoc : any = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']
  constructor(
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase,
    public router : Router
  ) { 
     //gan gia tri 
     this.hocky = this.authService.getHocky()
     this.malop = this.authService.getMalop()
     this.hk = this.hocky.slice(2)
   
  }

  ngOnInit() {
    this.afDB.list('danhsachmonhoc').valueChanges().subscribe(res=>{
     this.listmonhoc = res
    })
    this.afDB.list('danhsachgiangvien').valueChanges().subscribe(res=>this.listgiangvien=res)

    
  }
 getTengv(event)
 {
   if(this.tenmonhoc == '')
   {
    this.authService.presentAlert4('Vui lòng chọn môn học trước !')
   }
   else
   {
    this.tengiangvien = event.detail.value
    this.checkshow = false
   }
 }
 getTenmh(event)
 {
  this.tenmonhoc = event.detail.value
 }
 getNgayhoc(event)
 {
  this.ngayhoc += event.detail.value + " " // ngayhoc = ngayhoc + event.xxx.xxx
 }
 clickIcon()
 {
   this.checkshow = !this.checkshow // nghich dao checkshow
   this.tengiangvien = '' // xoa tengiangvien va tenmonhoc 
   this.tenmonhoc = ''  
 }
 TiepTuc()
 {
   // kiem tra coi co bi rong hay khong?
  if((this.tenmonhoc && this.tengiangvien && this.ngaybatdau 
    && this.ngayketthuc && this.giobatdau && this.gioketthuc
     && this.ngayhoc) != '')
  {
    //set gia tri len authentication-Service
    this.authService.setNgaybatdau(this.ngaybatdau)
    this.authService.setNgayketthuc(this.ngayketthuc)
    this.authService.setGiobatdau(this.giobatdau)
    this.authService.setNgayhoc(this.ngayhoc) 
    //chuyen trang
    this.router.navigate(['thongtinphangio'])    
  }
  else
  {
    this.authService.presentAlert4('Bạn vui lòng chọn đầy đủ các thông tin !')
  }
 }
  
}
