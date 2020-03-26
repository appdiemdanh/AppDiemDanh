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

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  email = this.dangnhap.email

  users: Observable<any[]>;

  chucvu = ''
  user : any
  event : any

  e : any
  p : any 

  listUser : [{
    email : '',
    chucvu : ''
  }]
  constructor(
    public dangnhap : DangnhapPage,
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase,
    public afs : AngularFirestore,
    public router : Router
  ) {
    this.chucvu = this.authService.getChucvu()
    this.authService.setChucvu(this.chucvu)
    //let listItems : any = this.authService.arrayUser

    //this.afD.list('user').valueChanges().subscribe(console.log)
    //this.afDB.list("listItems/").valueChanges().subscribe(data => {
      //this.listItems = data
      //console.log(this.listItems) 
    //})
    //console.log(this.user)
   }

  ngOnInit() {

  }

  logOut()
  {
    this.authService.SignOut().then((res)=>{
      //this.dangnhap.setUser(this.email)   
    }).catch((error)=>{
      console.log(error)
    })
  }
  ggetData()
  {
    let con
    this.afs.collection('listuser').valueChanges().subscribe(data => {this.user = data}
    )
    let a : any = JSON.stringify(this.user)
    console.log(a)
    //for(let i of a)
    //{
      //con = i["email"];
    //}
    //console.log(con)

  }
  keyup(event)
  {
    
  }
  getData()
  {
    let a, b : any
    let arrUser = this.authService.arrayUser
    for(let u of arrUser)
    {
      //console.log(u.chucvu + u.email)
      let err 
      a = 'daotao'
      b = 'capky99@gmail.com'
      let c = u.email 
      let d = u.chucvu
      console.log(c)
      if(c == b && d == a)
      {
        err = true
        console.log('đúng')
      }
      if(err == true)
      {
        this.router.navigate(['tabs/tab5'])
        console.log('thành công')
      }
     

    }
  }
}
