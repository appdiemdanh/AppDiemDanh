import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router'
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  isChecked = ""
  id = ""
  listsinhvien : any
  xemsinhvientheo = 'tatcasinhvien'

  public sothutu = ''

  constructor(
    private afDB : AngularFireDatabase,
    private router : Router,
    public authService : AuthenticationService
    ) {
   }

  ngOnInit() {
    this.afDB.list(`/danhsachsinhvienk18/`).valueChanges().subscribe(res=>{this.listsinhvien = res}) 
  }
  getItem(mssv)
  {
    this.authService.setMssv(mssv + "")
    console.log(mssv)
    this.router.navigate(['thongtinsv'])
  }
  //
    dieukienShow(tenlophoc) // ten lop hoc lay ben sv.A( .html) qua
    {
      let dkxemtacasinhvien = (this.xemsinhvientheo == 'tatcasinhvien') // this.xemsinhvient == 'tatcasinhvien' thì mình show ra hết sv luôn
      let dkxemsvlopDD1     = (this.xemsinhvientheo == 'svlopCD18DĐ1' && tenlophoc == 'CD18DĐ1')
      let dkxemsvlopTM1     = (this.xemsinhvientheo == 'svlopCD18TM1' && tenlophoc == 'CD18TM1')
      let dkxemsvlopLW1     = (this.xemsinhvientheo == 'svlopCD18LW1' && tenlophoc == 'CD18LW1')
      
      return dkxemtacasinhvien || dkxemsvlopDD1 || dkxemsvlopTM1 || dkxemsvlopLW1
    }
  //
  Sapxepkitu()
   {
     this.listsinhvien.sort(function(a, b) {
       return a.D[0].localeCompare(b.D[0]);
     });
    
     var newsinhvien = {};
    
     for (var i = 0; i < this.listsinhvien.length; i++) {
       var c = this.listsinhvien[i].D[0].toUpperCase();
       if (newsinhvien[c] && newsinhvien[c].length >= 0)
         newsinhvien[c].push(this.listsinhvien[i]);
       else {
         newsinhvien[c] = [];
         newsinhvien[c].push(this.listsinhvien[i]);
       }
     }
    
     console.log(newsinhvien);
   }
  //

}
