import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-chonlop',
  templateUrl: './chonlop.page.html',
  styleUrls: ['./chonlop.page.scss'],
})
export class ChonlopPage implements OnInit {

  malop : string
  monhoc : string
  listdiemdanh: any = []

  constructor(
    public authService: AuthenticationService,
    public afDB: AngularFireDatabase
    ) {
    this.malop = this.authService.getMalop()
    this.malop = this.authService.getMsmh()
    
    
  }

  ngOnInit() {
    this.afDB.list('diemdanh').valueChanges().subscribe(res => {
      let diemdanh: any = res
      for (let ldd of diemdanh) {
        console.log(ldd.lop)
        console.log(ldd.monhoc)
        if ( this.malop == ldd.lop && this.monhoc == ldd.monhoc){
            this.listdiemdanh.push(ldd)
        }
      }
      // setTimeout(function(){ 
      //   if(this.listdiemdanh=[])
      //   alert("Chưa có thông tin điểm danh của môn này.");}, 1000);
    })
  }
  logOut()
  {
    this.authService.SignOut()
  }

}
