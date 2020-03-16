import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor() {
    this.Sapxepkitu();
   }

  ngOnInit() {
  }
  //
  Sapxepkitu()
   {
     this.listsinhvien.sort(function(a, b) {
       return a.tensv[0].localeCompare(b.tensv[0]);
     });
    
     var newsinhvien = {};
    
     for (var i = 0; i < this.listsinhvien.length; i++) {
       var c = this.listsinhvien[i].tensv[0].toUpperCase();
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
  listsinhvien = 
  [
    {
      mssv : 'S0001',
      tensv : 'Cáp Kỳ',
      lop : 'CD18DD1',
      ngaysinh : '12/12/2000'
    },
    {
      mssv : 'S0002',
      tensv : 'Nguyễn Quang Khải',
      lop : 'CD18DD2',
      ngaysinh : '12/08/2000'
    },
    {
      mssv : 'S0003',
      tensv : 'Nguyễn Hoàng Thanh Vy',
      lop : 'CD18DD1',
      ngaysinh : '06/06/2000'
    },
    {
      mssv : 'S0004',
      tensv : 'Lê Minh Phố',
      lop : 'CD18DD4',
      ngaysinh : '27/04/1999'
    },
    {
      mssv : 'S0005',
      tensv : 'Lê Quang Huy',
      lop : 'CD18DD2',
      ngaysinh : '07/09/2000'
    },
  ];

}
