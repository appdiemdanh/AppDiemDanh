import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-thongtin-gv',
  templateUrl: './thongtin-gv.page.html',
  styleUrls: ['./thongtin-gv.page.scss'],
})
export class ThongtinGvPage implements OnInit {

  msgv = ''
  listgiangvien : any

  constructor(
    private authService : AuthenticationService,
    private afDB : AngularFireDatabase
    ){ 
    this.msgv = this.authService.getMsgv()
  }

  ngOnInit() {
    this.afDB.list('danhsachgiangvien').valueChanges().subscribe(res=>this.listgiangvien = res)
  }

}
