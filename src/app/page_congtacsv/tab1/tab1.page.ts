import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  mangLophoc = []
  mangMonhoc = []
  mangHocky  = ['Tất cả học kỳ']
  malop = ''
  monhoc = ''
  hocky = ''
  constructor(
    public router : Router,
    public authService: AuthenticationService,
    public afDB: AngularFireDatabase
    ) {
   }

  ngOnInit() {
    this.getDanhsachhocky()
    this.getDanhsachlop()
    this.getDanhsachmonhoc()  
  }
  //
  getDanhsachhocky()
  {
    this.afDB.list('danhsachhocky').valueChanges().subscribe(res =>{
      let danhsachhocky : any = res
      for (let dshk of danhsachhocky)
      {
        this.mangHocky.push(dshk.B)
      }
    })
  } 
  getDanhsachmonhoc()
  {
    this.afDB.list('danhsachmonhoc').valueChanges().subscribe(res => {
      let danhsachmonhoc: any = res
      for (let dsmh of danhsachmonhoc) 
      {
        if (this.hocky == "Tất cả học kỳ")
        {
          this.mangMonhoc.push(" " + dsmh.D + " ")
        }
        else if (dsmh.A == this.hocky) // dsmh.A (là dsmh.hocky ở firebase)
        {
          this.mangMonhoc.push(" " + dsmh.D + " ")
        }
      }
    })
  }
  getDanhsachlop()
  {
    this.afDB.list('danhsachlop').valueChanges().subscribe(res => {
      let danhsachlop: any = res
      for (let dsl of danhsachlop) {
        this.mangLophoc.push(dsl.B)
      }
    })
  }
  
  // get từ ion-select
  getLophoc(event)
  {
    this.malop = event.detail.value
  }
  getMonhoc(event)
  {
    this.monhoc = event.detail.value
  }
  getHocky(event)
  {
    this.hocky = event.detail.value
    this.mangMonhoc = [] // cho mảng rỗng mỗi khi click chọn học kỳ để tránh cộng dồn mảng 
    this.getDanhsachmonhoc() // gọi hàm để push giá trị cho mảng môn học
  }

  xemLichsudiemdanh()
  {
    let dadangnhap = localStorage.getItem('isLogged')
    if ( (this.malop && this.monhoc) != '')
    {
      if (dadangnhap == "true")
      {
        this.authService.setMalop(this.malop)
        this.authService.setMsmh(this.monhoc)
        this.router.navigate(['lichsu'])
      }
      else
      {
        this.authService.presentAlert3("Thông báo ", "Vui lòng đăng nhập để tiếp tục!", "dangnhap")
      }
    }
    else
    {
      this.authService.presentAlert4('Vui lòng chọn đủ lớp học và môn học!')
    }
  }

}
