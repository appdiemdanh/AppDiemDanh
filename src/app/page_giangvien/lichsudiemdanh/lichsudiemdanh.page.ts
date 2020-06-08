import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-lichsudiemdanh',
  templateUrl: './lichsudiemdanh.page.html',
  styleUrls: ['./lichsudiemdanh.page.scss'],
})
export class LichsudiemdanhPage implements OnInit {

  malop = ''
  monhoc = ''
  tengiangvien = ''
  listdiemdanh : any = [] 

  isShowDihoc = false
  isShowVanghoc = false

  constructor(
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase
  ) {
    this.malop          = this.authService.getMalop()
    this.monhoc         = this.authService.getMsmh()
    this.tengiangvien   = this.authService.getTengiangvien()
   }

  ngOnInit() {
    this.getLichsudiemdanh()
  }

  /**
   * lấy ra list điểm danh thỏa điều kiện : cùng lớp, cùng môn học, cùng giảng viên dạy
   */
  getLichsudiemdanh()
  {
    this.afDB.list('diemdanh').valueChanges().subscribe(res=>
      {
        let diemdanh : any = res
        for(let ldd of diemdanh)
        {
          if(ldd.lop == this.malop && ldd.monhoc == this.monhoc && ldd.giangvienday == this.tengiangvien) 
          {
            //console.log(ldd)
            this.listdiemdanh.push(ldd)
          }
        }
      })
  }

}
