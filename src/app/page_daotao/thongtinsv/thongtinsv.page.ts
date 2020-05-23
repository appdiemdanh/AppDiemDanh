import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database'

@Component({
  selector: 'app-thongtinsv',
  templateUrl: './thongtinsv.page.html',
  styleUrls: ['./thongtinsv.page.scss'],
})
export class ThongtinsvPage implements OnInit {

  mssv = ''
  listsinhvien : any
  thongtinsinhvien : any

  constructor(
    public authService : AuthenticationService,
    public afDB        : AngularFireDatabase
  ) { 
    this.mssv = this.authService.getMssv()
    //console.log(this.mssv)
  }

  ngOnInit() {
    this.afDB.list('danhsachsinhvienk18').valueChanges().subscribe(res=> this.listsinhvien = res)    
      
    }
  }
  

