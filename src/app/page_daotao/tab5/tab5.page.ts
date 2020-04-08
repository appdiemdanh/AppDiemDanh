import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tab4Page } from '../tab4/tab4.page';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  myday = new Date()

  hocky = ''
  malop = ''

  constructor(
    public tab4 : Tab4Page,
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase,
    public router : Router
    ) { 
      console.log(this.myday.getMonth() + 2)
     }


  ngOnInit() {
  }
  
  getHocky(event)
  {
    this.hocky = event.detail.value
  }
  getLop(event)
  {
    this.malop = event.detail.value
  }
  nextPage()
  {
    if((this.hocky && this.malop) != '')
    {
       //set gia tri 
      this.authService.setHocky(this.hocky)
      this.authService.setMalop(this.malop)
      //chuyen man hinh
      this.router.navigate(['phangiohoc'])
    }
    else
    {
      this.authService.presentAlert4('Bạn vui lòng chọn đầy đủ thông tin học kỳ và lớp !')
    }
  }
 


}
