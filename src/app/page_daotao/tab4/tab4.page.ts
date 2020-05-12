import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router'
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  isChecked = ""
  id = ""
  listsinhvien : any

  public sothutu = ''

  constructor(
    private afDB : AngularFireDatabase,
    private router : Router,
    public authService : AuthenticationService
    ) {
   }

  ngOnInit() {
    this.afDB.list(`/danhsachsinhvienk18/`).valueChanges().subscribe(res=>{this.listsinhvien = res}) 
    
  }
  gotoThongtinsv(mssv)
  {
    this.authService.setMssv(mssv + "")
    //console.log(mssv)
    this.router.navigate(['thongtinsv'])
  }

}
