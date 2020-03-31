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

  public listsvDD1 : any 
  public listsvTM1 : any
  public listsvLW1 : any
  public listsinhvien : any
  public listgiangvien : any
  public listmonhoc : any
  public listlop : any

  public tenlop = "CD18LW1"
  public hocky = "HK3"


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
    this.afDB.list(`/danhsachmonhoc/` + this.hocky).valueChanges().subscribe(res=>{this.listmonhoc = res})
    this.afDB.list(`/danhsachlop/`).valueChanges().subscribe(res=>{this.listlop = res}) &&
    this.afDB.list(`/danhsachsinhvienk18/` + this.tenlop).valueChanges().subscribe(res=>{this.listsinhvien = res}) 
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
    console.log(this.listmonhoc)
  }
 
}
