import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  listmonhoc : any
  hocky = 'HK2'
  listhocky = [{tenhocky : 'Học Kỳ 1', id : 'HK1'}, {tenhocky : 'Học Kỳ 2', id : 'HK2'}, {tenhocky : 'Học Kỳ 3', id : "HK3"}]
  constructor(private afDB : AngularFireDatabase) { }

  ngOnInit() {
    this.afDB.list(`/danhsachmonhoc/` + this.hocky).valueChanges().subscribe(res=>{this.listmonhoc = res})
  }

  getId(event)
  {
    console.log(event)
  }
 

}
