import { Component, OnInit } from '@angular/core';
import { Tab2Page } from '../tab2/tab2.page';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // list giao vien
  listgv = [
    {
      msgv : 'G0001',
      tengv : 'Trần Công Mua'
    },
    {
      msgv : 'G0002',
      tengv : 'Phạm Đào Minh Vũ'
    },
    {
      msgv : 'G0003',
      tengv : 'Vũ Phạm Đình Thái'
    }
  ];
  //
  click()
  {
    console.log('mày đang click');
  }
}
