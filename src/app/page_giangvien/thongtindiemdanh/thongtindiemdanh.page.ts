import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';

@Component({
  selector: 'app-thongtindiemdanh',
  templateUrl: './thongtindiemdanh.page.html',
  styleUrls: ['./thongtindiemdanh.page.scss'],
})
export class ThongtindiemdanhPage implements OnInit {

  listsvdihoc : any = []
  listsvvanghoc : any = []

  constructor(
    public authService : AuthenticationService
  ) { 
    this.listsvdihoc = this.authService.getListdihoc()
    this.listsvvanghoc = this.authService.getListvanghoc()
    console.log('sv có mặt' ,this.listsvdihoc)
    console.log('sv vắng học' ,this.listsvvanghoc)
  }

  ngOnInit() {
  }

}
