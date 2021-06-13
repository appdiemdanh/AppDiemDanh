import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router'
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  
  listsinhvien = []

  constructor(
    private afDB : AngularFireDatabase,
    private router : Router,
    public authService : AuthenticationService
    ) {
   }

  ngOnInit() {
    this.afDB.list(`/danhsachsinhvienk18/`).valueChanges().subscribe(res => {
      let listsv : any = res
      for (let i = 0; i < listsv.length; i ++)
      {
        this.listsinhvien.push({
          sothutu : i + 1,
          tensinhvien : listsv[i].D,
          mssv : listsv[i].C
        })
      }
    }) 
  }
  /**
   * 
   * @param mssv : là mã sinh viên truyền khi click vào từng item sinh viên trong list
   */
  gotoThongtinsv(mssv)
  {
    this.authService.setMssv(mssv)
    this.router.navigate(['thongtin-sv'])
  }

}
