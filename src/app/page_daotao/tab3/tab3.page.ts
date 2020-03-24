import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  listlop = [
    {
      malop : 'L0001',
      tenlop : 'CD18DD1',
      loailop : 'Thường'
    },
    {
      malop : 'L0002',
      tenlop : 'CD18DD2',
      loailop : 'Thường'
    },
    {
      malop : 'L0003',
      tenlop : 'CD18DD3',
      loailop : 'CLC'
    },
    {
      malop : 'L0004',
      tenlop : 'CD18DD4',
      loailop : 'Thường'
    }
  ];
}
