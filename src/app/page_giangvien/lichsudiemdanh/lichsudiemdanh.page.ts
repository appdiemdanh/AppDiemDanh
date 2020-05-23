import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-lichsudiemdanh',
  templateUrl: './lichsudiemdanh.page.html',
  styleUrls: ['./lichsudiemdanh.page.scss'],
})
export class LichsudiemdanhPage implements OnInit {

  malop = ''
  listdiemdanh : any = [] 

  isShowDihoc = false
  isShowVanghoc = false

  constructor(
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase
  ) {
    this.malop = this.authService.getMalop()
   }

  /**
   * Mảng lấy từ firebase về nếu lọc điều kiện thì mảng hứng giá trị phải dùng hảm push()
   * nếu không lọc thì dùng dấu = luôn
   */
  ngOnInit() {
    this.afDB.list('diemdanh').valueChanges().subscribe(res=>
      {
        let diemdanh : any = res
        for(let ldd of diemdanh)
        {
          if(ldd.lop == this.malop)
          {
            //console.log(ldd)
            this.listdiemdanh.push(ldd)
           }
        }
      })
  }

}
