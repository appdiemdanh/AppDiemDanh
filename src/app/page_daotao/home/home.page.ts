import { Component, OnInit } from '@angular/core';
import { DangnhapPage } from 'src/app/page_login/dangnhap/dangnhap.page';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators'
import { TestBed } from '@angular/core/testing';
import { TestObject } from 'protractor/built/driverProviders';
import { Router } from '@angular/router';
import { join } from 'path';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public hocky = ''
  listtest : any

  constructor(
    public dangnhap : DangnhapPage,
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase,
    public afs : AngularFirestore,
    public router : Router
  ) {
  
   }

  ngOnInit() {
    //khoi tao gia tri ban dau
    this.afDB.list('danhsachsinhvienk18').valueChanges().subscribe(res=>this.listtest=res)
  }


  logOut()
  {
    this.authService.SignOut().then((res)=>{
    }).catch((error)=>{
      console.log(error)
    })
  }
  getData()
  {
    let a = this.listtest[1]
    console.log(a)
    //console.log(this.listmonhoc)
    
  }
 
}
