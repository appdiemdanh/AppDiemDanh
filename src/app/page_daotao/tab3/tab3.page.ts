import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  listlop : any

  constructor(private afDB : AngularFireDatabase) { }

  ngOnInit() {
    this.afDB.list(`/danhsachlop/`).valueChanges().subscribe(res=>{this.listlop = res})
  }
}
