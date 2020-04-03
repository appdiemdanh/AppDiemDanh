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

  listmonhoc : any
  xemmonhoctheo = 'tatcamonhoc'

  constructor(
    private afDB : AngularFireDatabase,
    private authService : AuthenticationService,
    private router : Router
    ) { }

  ngOnInit() {
    this.afDB.list(`/danhsachmonhoc/`).valueChanges().subscribe(res=>{this.listmonhoc = res})
  }

  //điều kiện để show list ra là hocky truyền từ bên .html qua đây phải = gì đó và this.status = gì đó...
  dieukienShow(hocky) 
  {
    let dkxemtatca = (this.xemmonhoctheo == 'tatcamonhoc')
    let dkxemhk1   = (this.xemmonhoctheo == 'hocky1' && hocky == 'HK1')
    let dkxemhk2   = (this.xemmonhoctheo == 'hocky2' && hocky == 'HK2')
    let dkxemhk3   = (this.xemmonhoctheo == 'hocky3' && hocky == 'HK3')
    
    return dkxemtatca || dkxemhk1 || dkxemhk2 || dkxemhk3
  }
  getMaMH(mamonhoc)
  {
    // lấy được mã môn học rồi thì set để tý nữa get ra dùng
    this.authService.setMsmh(mamonhoc)
    this.router.navigate(['thongtin-mh'])
  }

}
