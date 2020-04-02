import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  listmonhoc : any
  hocky = 'HK1'
  listhocky = [{tenhocky : 'Học Kỳ 1', id : 'HK1'}, {tenhocky : 'Học Kỳ 2', id : 'HK2'}, {tenhocky : 'Học Kỳ 3', id : "HK3"}]
  xemmonhoctheo = 'tatcamonhoc'

  constructor(private afDB : AngularFireDatabase) { }

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

}
