import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thongtinlop',
  templateUrl: './thongtinlop.page.html',
  styleUrls: ['./thongtinlop.page.scss'],
})
export class ThongtinlopPage implements OnInit {

  listlop : any
  listsv : any = []
  tongsv : number
  malop = ''
  isShowListSV : boolean = false

  constructor(
    private afDB : AngularFireDatabase,
    private authService : AuthenticationService,
    private router : Router
  ) {
    //gan gia tri 
    this.malop = this.authService.getMalop()
    //this.tongsv = this.authService.gettongsv()
    //console.log(this.malop + "  " + this.tongsv)
    
  }

  ngOnInit() {
    this.afDB.list('danhsachlop').valueChanges().subscribe(res=>this.listlop=res)
    this.afDB.list('danhsachsinhvienk18').valueChanges().subscribe(res=>
    {
      let danhsachsinhvienk18 : any = res
      for(let sv of danhsachsinhvienk18)
      {
        if(sv.A == this.malop) // sv.A là malop tren firebase 
        {
          this.listsv.push(sv)
        }
      }
      this.tongsv = this.listsv.length
    })
  }

  gotoThongtinsv(mssv)
  {
    // set mssv len authService
    this.authService.setMssv(mssv)
    
    // chuyển màn hình
    this.router.navigate(['thongtinsv'])
  }

}
