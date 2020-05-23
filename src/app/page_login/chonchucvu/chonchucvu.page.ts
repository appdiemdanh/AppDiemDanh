import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { app } from 'firebase';
import { Router, Navigation } from '@angular/router';


import { Platform, AlertController } from '@ionic/angular'
import { AuthenticationService } from 'src/app/shared/authenticatin-Service'


@Component({
  selector: 'app-chonchucvu',
  templateUrl: './chonchucvu.page.html',
  styleUrls: ['./chonchucvu.page.scss'],
})
export class ChonchucvuPage implements OnInit {

  chucvu = ''
  
  constructor(
    private platform : Platform,
    public router : Router,
    public authService : AuthenticationService
    ) {
   }

  ngOnInit() {
  }
  
  getId(event)
  {
    this.chucvu = event.target.id
    //console.log(this.chucvu)
  }
  TiepTuc()
  {
    if(this.chucvu !== '')
    {
      this.authService.setChucvu(this.chucvu) // set chuc vu len authService  
      this.router.navigate(['dangky'])
    }
    else
    {
      this.authService.presentAlert4('Bạn chưa chọn chức vụ của mình!')
    }
    //console.log(this.getChucvu())
    //console.log(this.chucvu)
  }
 
}