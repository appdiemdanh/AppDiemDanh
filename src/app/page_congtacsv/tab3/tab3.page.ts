import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  constructor(
    public authService : AuthenticationService
  ) { }

  ngOnInit() {
  }

  logOut()
  {
    this.authService.SignOut()
  }
}
