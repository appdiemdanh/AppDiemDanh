import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-chonmon',
  templateUrl: './chonmon.page.html',
  styleUrls: ['./chonmon.page.scss'],
})
export class ChonmonPage implements OnInit {

  malop : any = []
  monhoc : any = []
  tenlop;
  tenmonhoc;
  constructor(
    public router : Router,
    public authService: AuthenticationService,
    public afDB: AngularFireDatabase
    ) {
   }

  ngOnInit() {
    this.afDB.list('danhsachlop').valueChanges().subscribe(res => {
      let danhsachlop: any = res
      for (let dsl of danhsachlop) {
        this.malop.push(dsl.B)
      }
    })
    this.afDB.list('danhsachmonhoc').valueChanges().subscribe(res => {
      let danhsachmonhoc: any = res
      for (let dsmh of danhsachmonhoc) {
        this.monhoc.push(" "+dsmh.D+" ")
      }
    })
  }
  getLophoc(event)
  {
    this.tenlop = event.detail.value
    console.log(this.tenlop);
  }
  getMonhoc(event)
  {
    this.tenmonhoc = event.detail.value
    console.log(this.tenmonhoc);
  }
  chonlop(){
    this.authService.setMalop(this.tenlop)
    this.authService.setMsmh(this.tenmonhoc)
    this.router.navigate(['lichsu'])
  }
}
