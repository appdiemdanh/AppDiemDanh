import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-thongtindiemdanh',
  templateUrl: './thongtindiemdanh.page.html',
  styleUrls: ['./thongtindiemdanh.page.scss'],
})
export class ThongtindiemdanhPage implements OnInit {

  id : number
  ngaydiemdanh  = ''
  giodiemdanh = ''
  lop = ''
  monhoc = ''
  malop = ''
  soluongSVdihoc : number
  soluongSVvanghoc : number
  listdiemdanh : any = []
  listdiemdanhcuoicung : any = []

  isshowDihoc = false
  isshowVanghoc = false

  constructor(
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase
  ) { 
    this.malop = this.authService.getMalop()
  }

  /**
   *  đầu tiên sẽ gán tất cả giá trị của diemdanh(list trên firebase) vào mảng diemdanh
   *  tiếp theo mình sẽ dùng for và lọc điều kiện lop(diemdanh firebase) == malop(truyền từ page thoikhoabieu)
   * nếu điều kiện đúng thì gán giá trị cho listdiemdanh (list này đều có lop = malop)
   *  Sau đó mình thoát ra vòng lặp for thì giá trị của listdiemdanh chỉ trả ra cái cuối cùng thôi
   * vd : trong for nó có 100 giá trị thoát ra for thì chỉ còn 1 thôi tại vì đâu còn vòng lặp nào đâu
   *  và mình gán giá trị cuối chính là điểm danh mới nhất của lớp đó vào mảng listdiemdanhcuoicun là xong.
   */
  ngOnInit() {
    this.afDB.list('diemdanh').valueChanges().subscribe(res=>
      {
        let diemdanh : any = res
        for(let dd of diemdanh)
        {
          if(dd.lop == this.malop) // dd.lop == this.malop khác với this.malop == dd.lop nha (test thử xong console ra là biết)
          {
            this.listdiemdanh   = dd // gán tất cả giá trị thỏa điều kiện vào listdiemdanh
          }          
        }
        //thoát khỏi vòng lặp thì listdiemdanh sẽ trả ra giá trị cuối cùng của listdiemdanh thôi
        // lấy ra cái được điểm danh cuối cùng của lớp đó vd (diem danh 1, diem danh2, diem danh 3) thì thoát khỏi vòng lặp nó lấy ra diem danh 3
        this.listdiemdanhcuoicung.push(this.listdiemdanh)
      })
  }

}
