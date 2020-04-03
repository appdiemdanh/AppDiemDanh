import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  listlop : any
  listsinhvien : any

  constructor(
    private afDB : AngularFireDatabase,
    private authService : AuthenticationService,
    private router : Router
    ) { 
  }

  ngOnInit() {
    this.afDB.list(`/danhsachlop/`).valueChanges().subscribe(res=>{this.listlop = res})
    this.afDB.list('danhsachsinhvienk18').valueChanges().subscribe(res=>{this.listsinhvien=res})
  }
  getMalop(malop)
  {

    let tongsinhvien = 0
    for(let i = 1; i < this.listsinhvien.length; i++) // loc qua tung phan tu cua mang
      {
        let masolop = this.listsinhvien[i].A // lay gia tri masolop tai vi tri i
        if(masolop == malop) // neu masolop == malop truyen tu function getMalop(lop.B)
        {
          tongsinhvien += 1 // tong sinh vien cong them 1
        }
      }
      //console.log("dem : " + tongsinhvien)
      // set gia tri
      this.authService.setMalop(malop)
      this.authService.setTongsv(tongsinhvien + "")
      //chuyen man hinh
      this.router.navigate(['thongtinlop'])
  }
  
}
