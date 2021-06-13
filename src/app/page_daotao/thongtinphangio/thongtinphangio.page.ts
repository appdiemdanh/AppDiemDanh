import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { runInThisContext } from 'vm';

import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-thongtinphangio',
  templateUrl: './thongtinphangio.page.html',
  styleUrls: ['./thongtinphangio.page.scss'],
})
export class ThongtinphangioPage implements OnInit {

  hocky = ''
  tengiangvien = ''
  magiangvien = ''
  lop = ''
  tenmonhoc = ''
  tenphonghoc = ''
  ngaybatdau = ''
  ngayketthuc = ''
  giobatdau = ''
  gioketthuc = ''
  ngayhoc : any = [] 
  listngayhoc : any
  listphangio : any
  autoID = 0

  constructor(
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase,
  ) { 
  }

  ngOnInit() {
    this.GanGiaTriChoBien()
    this.afDB.list('phangiogiang').valueChanges().subscribe(res => {
      this.listphangio = res
    })
    this.getAutoID()
  }
  GanGiaTriChoBien()
  {
    this.hocky        = this.authService.getHocky()
    this.tengiangvien = this.authService.getTengiangvien() 
    this.magiangvien  = this.authService.getMagiangvien()
    this.lop          = this.authService.getMalop()
    this.tenmonhoc    = this.authService.getMsmh() 
    this.tenphonghoc  = this.authService.getPhonghoc()
    this.ngaybatdau   = this.authService.getNgaybatdau()
    this.ngayketthuc  = this.authService.getNgayketthuc()
    this.giobatdau    = this.authService.getGiobatdau()
    this.gioketthuc   = this.authService.getGioketthuc()
    this.ngayhoc      = this.authService.getNgayhoc()
  }
  PushDataToSever()
  {
    if((this.hocky && this.lop && this.tenmonhoc && this.tengiangvien && this.ngaybatdau 
      && this.ngayketthuc && this.giobatdau && this.gioketthuc
      && this.ngayhoc) == '')
    {
      this.authService.presentAlert4('Gửi lên sever thất bại, do bị thiếu thông tin phân giờ.')  
    }
    else
    {
      this.getAutoID()
      let modelPhangio = {
        id            : this.autoID,
        hocky         : this.hocky,
        tengiangvien  : this.tengiangvien,
        magiangvien   : this.magiangvien,
        lop           : this.lop,
        tenmonhoc     : this.tenmonhoc,
        tenphonghoc   : this.tenphonghoc,
        ngaybatdau    : this.ngaybatdau,
        ngayketthuc   : this.ngayketthuc,
        giobatdau     : this.giobatdau,
        gioketthuc    : this.gioketthuc,
        ngayhoc       : this.ngayhoc
      }
      // push len firebase sau do thong bao va chuyen trang
      this.afDB.object(`phangiogiang/${this.autoID}`).set(modelPhangio).then(res => {
        this.authService.presentAlert2('Thông báo', 'Đã gửi thông tin phân giờ thành công', 'phangiogiang', 'OK')
      })
    }  
  } 

  getAutoID()
  {
    this.afDB.list('phangiogiang').valueChanges().subscribe(res => {
      let listphangio = []
      listphangio.push(res)
      for (let lpg of listphangio)
      {
        this.autoID = lpg.length
      }
    })
  }

}

