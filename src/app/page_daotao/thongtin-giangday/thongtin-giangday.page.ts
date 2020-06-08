import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-thongtin-giangday',
  templateUrl: './thongtin-giangday.page.html',
  styleUrls: ['./thongtin-giangday.page.scss'],
})
export class ThongtinGiangdayPage implements OnInit {

  magiangvien = ''
  malop = ''
  monhoc = ''
  soluongsv = 0
  listthongtingiangday = []

  constructor(
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase
  ) 
  {
    this.magiangvien  = this.authService.getMagiangvien()
    this.malop        = this.authService.getMalop()
    this.monhoc       = this.authService.getTenmonhoc()
  }

  ngOnInit() {
    this.getThongtinlopdangday()
    this.getSoluongsinhvien()
  }

  getThongtinlopdangday()
  {
    this.afDB.list('phangiogiang').valueChanges().subscribe(res =>
      {
        let listphangio : any = res
        for (let lpg of listphangio)
        {
          if (lpg.magiangvien == this.magiangvien && lpg.lop == this.malop)
          {
            this.listthongtingiangday.push(lpg)
          }
        }
      })
  }
  
  getSoluongsinhvien()
  {
    this.afDB.list('danhsachsinhvienk18').valueChanges().subscribe(res =>
      {
        let listsinhvien : any = res
        for (let lsv of listsinhvien)
        {
          if (lsv.A == this.malop)
          {
            this.soluongsv += 1
          }
        }
      })
  }

}
