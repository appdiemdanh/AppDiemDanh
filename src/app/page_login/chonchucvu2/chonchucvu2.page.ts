import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authenticatin-Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chonchucvu2',
  templateUrl: './chonchucvu2.page.html',
  styleUrls: ['./chonchucvu2.page.scss'],
})
export class Chonchucvu2Page implements OnInit {

  chucvu = ''

  constructor(
    public authService : AuthenticationService,
    public router : Router
  ) { }


  ngOnInit() {
  }

  getId(event)
  {
    this.chucvu = event.target.id
  }

  createAccout()
  {
    if(this.chucvu !== '')
    {
      this.authService.setChucvu(this.chucvu)
      this.authService.GoogleAuth()
    }
    else
    {
      alert('Bạn chưa chọn chức vụ của mình!')
    }
  }
}
