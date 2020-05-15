import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  listmonhoctheohocky = []
  listhocky = ['Tất cả môn học'] // cho phần tử "tất cả môn học" đứng đầu tiên trong mảng listhocky
  tatcamonhoc : any = []
  constructor(
    private afDB : AngularFireDatabase,
    private authService : AuthenticationService,
    private router : Router
    ) { 
    }

  ngOnInit() {
    this.afDB.list(`/danhsachmonhoc/`).valueChanges().subscribe(res=>
      {
        // Khởi tạo giá trị ban đầu của mảng môn học là tất cả môn học
        this.listmonhoctheohocky = res
        // gán giá trị cho tatcamonhoc
        this.tatcamonhoc = res 
      })
    this.afDB.list('danhsachhocky').valueChanges().subscribe(res=>
      {
        let danhsachhocky : any = res
        for(let hk of danhsachhocky)
        {
          this.listhocky.push(hk.B)
        }  
      })
  }
  getHocky(event)
  {
    // lay ra hockyduocchon
    let hockyduocchon = event.detail.value
    // dau tien minh cho mảng monhoctheohocky = rỗng trước// nếu không mảng sẽ bị cộng dồn sau mỗi lần người dùng chọn học kỳ (hàm push())
    this.listmonhoctheohocky = []
    // gán giá trị
    for(let mh of this.tatcamonhoc)
    {
      if(hockyduocchon == "Tất cả môn học") // neu người dùng chọn tất cả môn học thì trả ra nguyên list luôn
      {
        this.listmonhoctheohocky = this.tatcamonhoc
      }
      else if(hockyduocchon == mh.A) //nếu người dùng chọn học kỳ nào thì trả ra môn học của học kỳ đó
      {
        this.listmonhoctheohocky.push(mh)
      }
    }
  }
  getMonhoc(mamonhoc)
  {
    // lấy được mã môn học rồi thì set để tý nữa get ra dùng
    this.authService.setMsmh(mamonhoc)
    this.router.navigate(['thongtin-mh'])
  }

}
