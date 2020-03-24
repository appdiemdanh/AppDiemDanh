import { Component, OnInit } from '@angular/core';
import { DangnhapPage } from 'src/app/page_login/dangnhap/dangnhap.page';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  email = this.dangnhap.email

  users: Observable<any[]>;

  constructor(
    public dangnhap : DangnhapPage,
    public authService : AuthenticationService,
    public afD : AngularFireDatabase    
  ) {
    this.afD.list('users').valueChanges().subscribe(console.log)
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
  getData()
  {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
  }

}
