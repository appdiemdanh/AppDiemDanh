import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-lichsu',
  templateUrl: './lichsu.page.html',
  styleUrls: ['./lichsu.page.scss'],
})
export class LichsuPage implements OnInit {
  malop : string
  monhoc : string
  listdiemdanh: any = []

  constructor(
    public authService: AuthenticationService,
    public afDB: AngularFireDatabase
    ) { 
  }

  ngOnInit() {
    this.afDB.list('diemdanh').valueChanges().subscribe(res => {
      let diemdanh: any = res
      this.malop = this.authService.getMalop()
      this.monhoc = this.authService.getMsmh()
      for (let ldd of diemdanh) {
        if ( ldd.lop === this.malop && ldd.monhoc === this.monhoc ){
            this.listdiemdanh.push(ldd)
        }
      }
      if(this.listdiemdanh.length===0){
        alert("Lớp học môn này chưa được điểm danh.")
      }
    })
  }
  logOut()
  {
    this.authService.SignOut()
  }
}