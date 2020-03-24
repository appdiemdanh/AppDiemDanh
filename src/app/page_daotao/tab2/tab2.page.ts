import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  listmonhoc = [
    {
      mamonhoc : 'M0001',
      tenmonhoc : 'Cơ sở lập trình',
      sotiet : '48'
    },
    {
      mamonhoc : 'M0002',
      tenmonhoc : 'Tin học',
      sotiet : '32'
    },
    {
      mamonhoc : 'M0003',
      tenmonhoc : 'CCNA 1',
      sotiet : '72'
    },
    {
      mamonhoc : 'M0004',
      tenmonhoc : 'Lập trình nâng cao',
      sotiet : '56'
    },
    {
      mamonhoc : 'M0005',
      tenmonhoc : 'Cơ sở Dữ liệu',
      sotiet : '64'
    }
  ];

}
