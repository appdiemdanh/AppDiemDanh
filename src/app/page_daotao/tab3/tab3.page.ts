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
      // set gia tri
      this.authService.setMalop(malop)
      //chuyen man hinh
      this.router.navigate(['thongtinlop'])
  }
  
}
