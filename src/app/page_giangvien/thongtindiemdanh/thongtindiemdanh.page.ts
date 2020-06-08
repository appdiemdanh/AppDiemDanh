import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-thongtindiemdanh',
  templateUrl: './thongtindiemdanh.page.html',
  styleUrls: ['./thongtindiemdanh.page.scss'],
})
export class ThongtindiemdanhPage implements OnInit {

  id : number
  ngaydiemdanh = ''
  giodiemdanh = ''
  lop = ''
  monhoc = ''
  malop = ''
  tengiangvien = ''
  thongtindiemdanh  = []

  isshowDihoc = false
  isshowVanghoc = false

  constructor(

    public authService : AuthenticationService,
    public afDB : AngularFireDatabase
  ) { 
    this.malop          = this.authService.getMalop()
    this.tengiangvien   = this.authService.getTengiangvien()
    this.ngaydiemdanh   = this.authService.getNgaydiemdanh()
  }


  ngOnInit() {
    this.getThongtindiemdanh()
  }
  
  /**
   *  thông tin điểm danh thõa 3 điều kiện : cùng tên giảng viên dạy, cùng tên lớp và cùng ngày điểm danh (của biến truyền qua và firebase)
   */
  getThongtindiemdanh()
  {
    this.afDB.list('diemdanh').valueChanges().subscribe(res=>
      {
        let diemdanh : any = res
        for (let ldd of diemdanh)
        {
          
          if ( ldd.giangvienday == this.tengiangvien && ldd.lop == this.malop && ldd.ngaydiemdanh == this.ngaydiemdanh) // dd.lop == this.malop khác với this.malop == dd.lop nha (test thử xong console ra là biết)
          {
            this.thongtindiemdanh.push(ldd) // gán giá trị thỏa điều kiện vào listdiemdanh
          }          
        }
      })
  }

}
