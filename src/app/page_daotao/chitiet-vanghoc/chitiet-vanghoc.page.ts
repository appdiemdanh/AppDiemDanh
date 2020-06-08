import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';

@Component({
  selector: 'app-chitiet-vanghoc',
  templateUrl: './chitiet-vanghoc.page.html',
  styleUrls: ['./chitiet-vanghoc.page.scss'],
})
export class ChitietVanghocPage implements OnInit {

  tenmonhoc = ''
  masv = ''
  thongtinvanghoc = []
  chitietvanghoc = []

  constructor(
    public authService : AuthenticationService
  ) 
  {
    this.tenmonhoc  = this.authService.getTenmonhoc()
    this.masv       = this.authService.getMssv()
    this.thongtinvanghoc = this.authService.getListthongtinvanghoc()
  }

  ngOnInit() {
   this.getChitietvanghoc()
  }

  getChitietvanghoc()
  {
    for (let i = 0; i < this.thongtinvanghoc.length; i ++)
    {
      for (let lmh of this.thongtinvanghoc[i].listmonhoc)
      {
        if (lmh.monhoc == this.tenmonhoc)
        {
          //console.log(lmh)
          this.chitietvanghoc.push(lmh)
        }
      }
    }
  }

}
