import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database'

@Component({
  selector: 'app-thongtin-mh',
  templateUrl: './thongtin-mh.page.html',
  styleUrls: ['./thongtin-mh.page.scss'],
})
export class ThongtinMhPage implements OnInit {

  msmh = ''
  listmonhoc : any

  constructor(
    private authService : AuthenticationService,
    private afDB : AngularFireDatabase
  ) {
    this.msmh = this.authService.getMsmh()
    console.log(this.msmh)
  }

  ngOnInit() {
    // gan this.listmonhoc = danhsachmonhoc lay tu firebase
    this.afDB.list('danhsachmonhoc').valueChanges().subscribe(res=>this.listmonhoc = res)
  }

}
