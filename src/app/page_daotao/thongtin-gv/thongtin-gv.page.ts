import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thongtin-gv',
  templateUrl: './thongtin-gv.page.html',
  styleUrls: ['./thongtin-gv.page.scss'],
})
export class ThongtinGvPage implements OnInit {

  msgv = ''
  solopdangday = 0
  isShowLop = false
  day = new Date()
  ngaythangnamhientai : Date
  thongtingiangvien = []
  mang_lopdangday = []

  constructor(
    private authService : AuthenticationService,
    private afDB : AngularFireDatabase,
    public router : Router
    ){ 
    this.msgv = this.authService.getMsgv()
  }

  ngOnInit() {
    this.getThongtingiangvien()
    this.getLopdangday()
  }

  /**
   * 
   * @param magiangvien : truyền qua khi click vào item của list môn học đang dạy
   * @param malop       :                       ''
   */
  xemThongtingiangday(magiangvien, malop, monhoc)
  {
    this.authService.setMagiangvien(magiangvien)
    this.authService.setMalop(malop)
    this.authService.setTenmonhoc(monhoc)
    this.router.navigate(['thongtin-giangday'])
  }

  getThongtingiangvien()
  {
    this.afDB.list('danhsachgiangvien').valueChanges().subscribe(res =>
      {
        let mang_gv : any = res
        mang_gv.filter(item_gv =>
          {
            if(item_gv.B == this.msgv)
            {
              this.thongtingiangvien.push(item_gv)
            }
          })     
      })
  }
  getLopdangday()
  {
    this.getNgayThanghientai()
    this.afDB.list('phangiogiang').valueChanges().subscribe(res =>
      {
        let mang_phangio : any = res
        // lọc theo từng điều kiên msgv -> ngaydiemdanh
        mang_phangio.filter(item_phangio =>
          {
            if (item_phangio.magiangvien == this.msgv)
            {
              // cắt ra ngày tháng năm
              let nambd     = item_phangio.ngaybatdau.split("-")[0] // cắt bởi dấu '-' lấy ra phần tử vị trí thứ 0 (đầu tiên)
              let thangbd   = item_phangio.ngaybatdau.split("-")[1]
              let ngaybd    = item_phangio.ngaybatdau.split("-")[2]
              let namkt     = item_phangio.ngayketthuc.split("-")[0]
              let thangkt   = item_phangio.ngayketthuc.split("-")[1]
              let ngaykt    = item_phangio.ngayketthuc.split("-")[2]
              // format ra dạng Date
              let ngaythangbatdau   = new Date(nambd, thangbd, ngaybd)
              let ngaythangketthuc  = new Date(namkt, thangkt, ngaykt)
              // so sánh ngày
              if (this.ngaythangnamhientai >= ngaythangbatdau && this.ngaythangnamhientai <= ngaythangketthuc)
              {
                this.mang_lopdangday.push(item_phangio)
                this.solopdangday = this.mang_lopdangday.length
              }
            }
          })
      })
  }
  getNgayThanghientai()
  {
    this.ngaythangnamhientai = new Date(this.day.getFullYear(), (this.day.getMonth() + 1), this.day.getDate())
  }

}
