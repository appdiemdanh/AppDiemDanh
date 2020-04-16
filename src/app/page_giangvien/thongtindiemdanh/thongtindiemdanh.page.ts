import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-thongtindiemdanh',
  templateUrl: './thongtindiemdanh.page.html',
  styleUrls: ['./thongtindiemdanh.page.scss'],
})
export class ThongtindiemdanhPage implements OnInit {

  id : number
  ngaydiemdanh  = ''
  giodiemdanh = ''
  lop = ''
  monhoc = ''
  soluongSVdihoc : number
  soluongSVvanghoc : number
  listsvdihoc : any = []
  listsvvanghoc : any = []
  listdiemdanh : any = []

  isshowDihoc = false
  isshowVanghoc = false

  constructor(
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase
  ) { 
    this.id = this.authService.getID() // lay từ diemdanh qua
  }

  /**
   * Sau khi lọc qua các điều kiện thì res trả ra tưng object 1 nên ta phải sử dụng hàm push() thay vì sài dấu =
   * để bên *ngFor hiểu được (vì *ngFor chỉ đọc kiểu như là array)
   */
  ngOnInit() {
    // gán giá trị cho lisdiemdanh với điều kiện ...
    this.afDB.list('diemdanh').valueChanges().subscribe(res=>
      {
        let listdiemdanhfirebase : any = res
        for(let lfb of listdiemdanhfirebase)
        {
          if(lfb.id == this.id)
          {
            // gan gia tri listdiemdanh 
            this.listdiemdanh.push(lfb)
            //gan gia tri cho listsvdihoc, vanghoc
            for(let ldd of this.listdiemdanh)
            {
              this.listsvdihoc = ldd.danhsachSVdihoc
              this.listsvvanghoc = ldd.danhsachSVvanghoc
            }
          }
        }
      })
      
  }

}
