import { Component, OnInit } from '@angular/core';
import { Tab2Page } from '../tab2/tab2.page';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  listgiangvien : any = ''

  constructor(
    private afDB : AngularFireDatabase,
    private authService : AuthenticationService,
    private router : Router
    ) { }

  ngOnInit() {
    this.afDB.list(`/danhsachgiangvien/`).valueChanges().subscribe(res=>{this.listgiangvien = res})
  }
  getMaGV(magiangvien)
  {
    this.authService.setMsgv(magiangvien)   
    this.router.navigate(['thongtin-gv'])
  }
}
