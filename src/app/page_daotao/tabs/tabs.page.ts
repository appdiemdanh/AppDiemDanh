import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  chucvu = ''
  constructor(public authService : AuthenticationService) { 
    this.authService.setChucvu(this.chucvu)
  }

  ngOnInit() {
  }

}
