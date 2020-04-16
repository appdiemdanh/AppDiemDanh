import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { runInThisContext } from 'vm';

import { AngularFireDatabase } from '@angular/fire/database';
import { phangiogiang } from 'src/app/page_login/shared/modPhangio'

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

  constructor(
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase,
  ) { 
    this.GanGiaTriChoBien()
  }

  ngOnInit() {
    // lay ra id phangio
    this.afDB.list('phangiogiang').valueChanges().subscribe(res=>{
        this.listphangio = res
    })
  }
  GanGiaTriChoBien()
  {
    this.hocky        = this.authService.getHocky()
    this.tengiangvien = this.authService.getMsgv() /// ten ham cung k quan trong mà quan trọng là giá trị trả về trong hàm đó thôi :))
    this.magiangvien  = this.authService.getMagiangvien()
    this.lop          = this.authService.getMalop()
    this.tenmonhoc    = this.authService.getMsmh() //sai chung voi ham getMsmh() cho khoe đỡ tao ham getTenmonhoc() moi
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
      let id = 0
      for(let pg of this.listphangio)
      {
        // neu id tren firebase != null thi gan id = id cua firebase els id = -1
        if(pg.id != null) 
        {
          id = pg.id // ra khoi vòng lặp for thì this.id sẽ gán bằng pg.id thứ cuối cùng của mảng
        }
        else
        {
          id = -1
        }
      }
      let autoID = id + 1  // tao id tu dong tang len 1 so voi id tren firebase
      // tao bien data theo mode phangiogiang ben shared/modPhangiogiang.ts
      let data : phangiogiang = {
        id            : autoID,
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
      this.afDB.list('phangiogiang').push(data).then(res=>{
        this.authService.presentAlert2('Thông báo', 'Đã gửi thông tin phân giờ thành công', 'phangiohoc', 'OK')
      }).catch(error=>{
        console.log('Lỗi ' + error)
      })  
    }  
  }

}

