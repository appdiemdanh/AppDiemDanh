import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-lichsu',
  templateUrl: './lichsu.page.html',
  styleUrls: ['./lichsu.page.scss'],
})
export class LichsuPage implements OnInit {
  malop = ''
  monhoc = ''
  listdiemdanh: any = []
  noData = false
  isShowDihoc = false
  isShowVanghoc = false

  constructor(
    public authService: AuthenticationService,
    public afDB: AngularFireDatabase
    ) { 
      this.malop = this.authService.getMalop()
      this.monhoc = this.authService.getMsmh()
  }

  ngOnInit() {
    // subscribe() khi có dữ liệu mới thì hàm này tự động gọi
    this.afDB.list('diemdanh').valueChanges().subscribe(res => {
      let diemdanh: any = res
      this.listdiemdanh = [] // cho mảng = rỗng để khi có dữ liệu mới thì tránh bị cộng dồn khi push
      for (let ldd of diemdanh) {
        if ( ldd.lop === this.malop && ldd.monhoc === this.monhoc ){
            this.listdiemdanh.push(ldd)
        }
      }
      if(this.listdiemdanh.length===0){
        this.noData = true
      }
    })
  }
 
}