import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/page_login/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diemdanh',
  templateUrl: './diemdanh.page.html',
  styleUrls: ['./diemdanh.page.scss'],
})
export class DiemdanhPage implements OnInit {

  day = new Date()
  malop = ''
  monhoc = ''
  isChecked = false
  tensv : string = ''
  isShow = false
  listfirebase : any
  listsinhvien = [] // muc đích dấu [] để có thể sử dụng hàm push()
  listsvdihoc : any = []
  listsvvanghoc : any = []

  constructor(
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase,
    public router : Router
  ) {
    // lay gia tri tu ben thoikhoabieu truyen qua
    this.malop = this.authService.getMalop()
    this.monhoc = this.authService.getMsmh()
    // điều kiện show ra ion-list
    if((this.malop && this.monhoc) != '')
    {
      this.isShow = true
    }
    //
   }
  /**
  *  sau khi chạy qua điều kiện malop(firebase) == malop(thoikhoabieu truyen qua)
  *  thì list trả ra kiểu [object] nên listsinhvien hứng(push về) cũng phải kiểu [] để bên file html đọc được 
  */
  ngOnInit() {
    this.afDB.list('danhsachsinhvienk18').valueChanges().subscribe((res)=>
    {
      this.listfirebase = res
      for(let lfb of this.listfirebase)
      {
        if(lfb.A == this.malop)
        {
          this.listsinhvien.push(lfb)
          this.listsvvanghoc.push(lfb.D)
        }
      }
    })
  }
  /**
   * Đầu tiên listsvvangmat = listsinhvien, listsvdihoc = []
   * if 1 : nếu sv được checked thì:
   *    + listsvdihoc thêm 1 sinh viên
   *    + listsvvanghoc trừ(xóa) 1 sinh viên
   * if 2 : nếu sv không được checked
   *    + listsvvanhoc thêm 1 sinh viên
   *    + listsvdihoc trừ(xóa) 1 sinh viên
   */
  getSinhvien(event)
  {
    this.isChecked = event.detail.checked
    this.tensv = event.detail.value
    //console.log(this.isChecked)
    //console.log(this.tensv)
    if(this.isChecked == true && this.tensv != '')
    {
      // thêm vào listsvdihoc
      this.listsvdihoc.push(this.tensv)
      // xóa ở listsvvanghoc
      let tensvbixoa = this.tensv
      let vitri = this.listsvvanghoc.indexOf(tensvbixoa)
      this.listsvvanghoc.splice(vitri, 1)

    }
    else if(this.isChecked == false && this.tensv != '')
    {
      // thêm vào listsvvanghoc
      this.listsvvanghoc.push(this.tensv)
      // Xóa ở listsvdihoc
      let tensvbixoa = this.tensv // lay ra ten sinh vien 
      let vitri = this.listsvdihoc.indexOf(tensvbixoa) // tim vi tri ten sinh vien đó
      this.listsvdihoc.splice(vitri, 1) // xóa tại vị trí thứ i, 1 phàn tử
    }
  }

  sendDiemDanh()
  {
      //console.log('List sv vắng học :' ,this.listsvvanghoc)
      //console.log('sv đi học', this.listsvdihoc)
    if(this.listsvdihoc.length > 0 && this.listsvvanghoc.length > 0)
    {
      this.authService.setListdihoc(this.listsvdihoc)
      this.authService.setListvanghoc(this.listsvvanghoc)
      this.router.navigate(['thongtindiemdanh'])
    }
    else
    {
      this.authService.presentAlert4('Bạn vui lòng chọn dấu tick nếu sinh viên có mặt và ngược lại, sau đó mới bấm điểm danh.')
    }
  }
  
}
