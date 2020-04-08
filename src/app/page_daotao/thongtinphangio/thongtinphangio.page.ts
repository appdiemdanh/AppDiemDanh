import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';

@Component({
  selector: 'app-thongtinphangio',
  templateUrl: './thongtinphangio.page.html',
  styleUrls: ['./thongtinphangio.page.scss'],
})
export class ThongtinphangioPage implements OnInit {

  ngayhoc = [] = ''
  constructor(
    public authService : AuthenticationService
  ) { 
    this.ngayhoc = this.authService.getNgayhoc()
    console.log(this.ngayhoc)
  }

  ngOnInit() {
  }

}
