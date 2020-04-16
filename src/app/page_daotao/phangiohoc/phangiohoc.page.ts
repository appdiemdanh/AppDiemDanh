import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phangiohoc',
  templateUrl: './phangiohoc.page.html',
  styleUrls: ['./phangiohoc.page.scss'],
})
export class PhangiohocPage implements OnInit {

  hocky = ''
  tenlop = ''
  magv = ''
  mamh = ''
  hk = ''
  tenmonhoc = ''
  tengiangvien = ''
  tenphonghoc = ''
  ngaybatdau = ''
  ngayketthuc = ''
  giobatdau = ''
  gioketthuc = ''
  mangngayhoc : any = []
  listphonghoc : any = []
  ngayhoc = '' // de view ra ben .html, detai : dong 117
  //
  thangbatdau : number
  thangketthuc : number
  //

  listmonhoc : any = []
  listlop : any
  showChonmonChongiangvien : boolean = true

  listngayhoc : any = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']
  listtiethoc : any = 
  [
    {
      tiethoc     : 'Tiết 1',
      giobatdau   : '7:00',
      gioketthuc  : '7:45'
    },
    {
      tiethoc     : 'Tiết 2',
      giobatdau   : '8:00',
      gioketthuc  : '8:45'
    },
    {
      tiethoc     : 'Tiết 3',
      giobatdau   : '9:00',
      gioketthuc  : '9:45'
    },
    {
      tiethoc     : 'Tiết 4',
      giobatdau   : '10:00',
      gioketthuc  : '10:45'
    },
    {
      tiethoc     : 'Tiết 5',
      giobatdau   : '11:00',
      gioketthuc  : '11:45'
    },
    {
      tiethoc     : 'Tiết 6',
      giobatdau   : '13:00',
      gioketthuc  : '13:45'
    },
    {
      tiethoc     : 'Tiết 7',
      giobatdau   : '14:00',
      gioketthuc  : '14:45'
    },
    {
      tiethoc     : 'Tiết 8',
      giobatdau   : '15:00',
      gioketthuc  : '15:45'
    },
    {
      tiethoc     : 'Tiết 9',
      giobatdau   : '16:00',
      gioketthuc  : '16:45'
    },
    {
      tiethoc     : 'Tiết 10',
      giobatdau   : '17:00',
      gioketthuc  : '17:45'
    },
  ]
  
  constructor(
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase,
    public router : Router,
  ) { 
     //gan gia tri 
     this.hocky = this.authService.getHocky()
     this.tengiangvien = this.authService.getMsgv()
     this.hk = this.hocky.slice(2) // cat tu vi tri thu 2 lay het phan tu con lai
  }

  ngOnInit() {
    // lay gia tri tren firbase gan cho listmonhoc va listgiangvien
    this.afDB.list('danhsachmonhoc').valueChanges().subscribe(res=>{
      let danhsachmonhoc : any = res 
      for(let mh of danhsachmonhoc)
      {
        if(mh.A == this.hocky)
        {
          this.listmonhoc.push(mh)
        }
      }
    })
    this.afDB.list('danhsachlop').valueChanges().subscribe(res=>this.listlop=res)
    this.afDB.list('danhsachphonghoc').valueChanges().subscribe(res=>this.listphonghoc=res)
    
    
  }
  getTenlop(event)
  {
    this.tenlop = event.detail.value
  }
  getTenmh(event)
  {
    this.tenmonhoc = event.detail.value
  }
  getTenphonghoc(event)
  {
    if((this.tenlop && this.tenmonhoc) == '')
    {
      this.authService.presentAlert4('Vui lòng chọn lớp và môn học trước !')
    }
    else
    {
      this.tenphonghoc = event.detail.value
      this.showChonmonChongiangvien = false // set = false de ion-list chứa chọn môn và chọn giảng viên đóng lại, chi tiết xem bên html tai dong 25
    }
  }
  getTietbatdau(event)
  {
    this.giobatdau = event.detail.value
  }
  getTietketthuc(event)
  {
    this.gioketthuc = event.detail.value
  }
  getNgayhoc(event)
  {
    let itemngayhoc = event.detail.value
    // push
    this.mangngayhoc.push(itemngayhoc)
     // gan gia tri de view ra html, dong 121
     this.ngayhoc += itemngayhoc + " "
  }
  iconDelete()
  {
    this.ngayhoc = ""  // xoa ngayhoc 
    this.mangngayhoc = [] // xoa mangngayhoc
  }

  iconMoRong()
  {
    this.showChonmonChongiangvien = !this.showChonmonChongiangvien // nghich dao checkshow
    this.tenmonhoc = ''  // xoa ten mon hoc
    this.tenphonghoc = ''
    this.tenlop = ''
  }

  TiepTuc()
  {  
    this.getMonths()
    // namthangnaybatdau =  năm + "-" + tháng + "-" + ngay
    let namthangngaybatdau  = this.ngaybatdau.slice(0, 4) + "-" + this.thangbatdau + "-" + this.ngaybatdau.slice(8, 10)
    let namthangngayketthuc = this.ngayketthuc.slice(0, 4) + "-" + this.thangketthuc + "-" + this.ngayketthuc.slice(8, 10)
    // kiem tra coi co bi rong hay khong?
    if((this.hk && this.tenlop && this.tenmonhoc && this.tengiangvien && this.ngaybatdau 
      && this.ngayketthuc && this.giobatdau && this.gioketthuc
      && this.mangngayhoc) != '')
    {
      //set gia tri len authentication-Service
      this.authService.setMalop(this.tenlop)
      this.authService.setMsmh(this.tenmonhoc)
      this.authService.setPhonghoc(this.tenphonghoc)
      this.authService.setNgaybatdau(namthangngaybatdau) 
      this.authService.setNgayketthuc(namthangngayketthuc)
      this.authService.setGiobatdau(this.giobatdau) 
      this.authService.setGioketthuc(this.gioketthuc)
      this.authService.setNgayhoc(this.mangngayhoc) 
      //chuyen trang
      this.router.navigate(['thongtinphangio'])    
    }
    else
    {
      this.authService.presentAlert4('Bạn vui lòng chọn đầy đủ các thông tin !')
    }
  }
  /**
     * nếu tháng có số 0 đầu thì bỏ số 0 đi 
     * thay vì phải viết nhiều lần if thì mình viết for cho nhanh
     *  i bắt đầu là 1 và chạy đến nhỏ hơn 10 (vì tháng có số 0 đầu thì chỉ có tháng 01 đến tháng 09)
     * nếu tháng trả về từ ngaybatdau hoặc ngayketthuc == tháng thứ '0i' thì trả ra thangbatdau = i
     * ngược lại nếu thangbd lớn hơn tháng 9 tức là tháng không có số 0 đầu thì tra ra thangbatdau = thangbd luôn 
     * 
     * Tương tự thì thangketthuc cũng như vậy
     */
  getMonths()
  {
    // bien
    let thangbd : any = this.ngaybatdau.split('-') // cat nhau neu gap dau "-"
    let thangkt : any = this.ngayketthuc.split('-')

    // loc dieu kien
    for(let i = 1; i < 10; i ++)
    {
      if((thangbd[1])== '0' + i)
      {
        this.thangbatdau= i
      }
      else if(thangbd[1] > 9) // [1] là phần tử thứ 1 trong mảng 
      {
        this.thangbatdau = thangbd[1]
      }
    }
    for(let i = 0; i < 10; i ++)
    {
      if(thangkt[1] == '0' + i)
      {
        this.thangketthuc = i
      }
      else if(thangkt[1] > 9)
      {
        this.thangketthuc = thangkt[1]
      }
    }

    //console.log(thangketthuc)
  }
  
}
