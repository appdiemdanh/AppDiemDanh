import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';

@Component({
  selector: 'app-thongtinlop',
  templateUrl: './thongtinlop.page.html',
  styleUrls: ['./thongtinlop.page.scss'],
})
export class ThongtinlopPage implements OnInit {

  listlop : any
  tongsv 
  malop = ''

  constructor(
    private afDB : AngularFireDatabase,
    private authService : AuthenticationService
  ) {
    //gan gia tri 
    this.malop = this.authService.getMalop()
    this.tongsv = this.authService.gettongsv()
    //console.log(this.malop + "  " + this.tongsv)

  }

  ngOnInit() {
    this.afDB.list('danhsachlop').valueChanges().subscribe(res=>this.listlop=res)
  }

}
