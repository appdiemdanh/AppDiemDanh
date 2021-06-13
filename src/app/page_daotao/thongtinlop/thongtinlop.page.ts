import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thongtinlop',
  templateUrl: './thongtinlop.page.html',
  styleUrls: ['./thongtinlop.page.scss'],
})
export class ThongtinlopPage implements OnInit {

  listlop : any
  listsv  = []
  tongsv : number
  malop = ''
  isShowListSV : boolean = false

  constructor(
    private afDB : AngularFireDatabase,
    private authService : AuthenticationService,
    private router : Router
  ) {
    this.malop = this.authService.getMalop()
  }

  ngOnInit() {
    this.afDB.list('danhsachlop').valueChanges().subscribe(res=>this.listlop=res)
    this.afDB.list('danhsachsinhvienk18').valueChanges().subscribe(res=>
    {
      let stt = 0
      let danhsachsinhvienk18 : any = res
      for (let i = 0; i < danhsachsinhvienk18.length; i ++)
      {
        // lấy ra sinh viên thõa điều kiện có mã lớp(firebase) == this.malop
        if (danhsachsinhvienk18[i].A == this.malop)
        {
          stt += 1
          this.listsv.push({
            sothutu : stt,
            tensinhvien : danhsachsinhvienk18[i].D,
            mssv : danhsachsinhvienk18[i].C
          })
        }
      }
      this.tongsv = this.listsv.length
    })
  }

  gotoThongtinsv(mssv)
  {
    // set mssv len authService
    this.authService.setMssv(mssv)
    
    // chuyển màn hình
    this.router.navigate(['thongtin-sv'])
  }

}
