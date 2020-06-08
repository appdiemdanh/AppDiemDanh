import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DiemDanh } from 'src/app/shared/modDiemdanh'

@Component({
  selector: 'app-diemdanh',
  templateUrl: './diemdanh.page.html',
  styleUrls: ['./diemdanh.page.scss'],
})
export class DiemdanhPage implements OnInit {

  day = new Date()
  malop = ''
  monhoc = ''
  hocky = ''
  tengiangvien = ''
  tensv : string = ''
  thungaythangnamhientai = ''
  soluongsinhvien : number
  isChecked = false
  dadiemdanhroi : boolean = false
  chontatca : boolean = false
  listsinhvien = [] // muc đích dấu [] để có thể sử dụng hàm push()
  listsvdihoc : any = []
  listsvvanghoc : any = []
  //
  listdiemdanh : any
  listthoikhoabieu : any = []


  constructor(
    public authService : AuthenticationService,
    public afDB : AngularFireDatabase,
    public router : Router,
    public alert : AlertController,
    public toastController : ToastController
  ) {
    // lay gia tri tu ben thoikhoabieu truyen qua
    this.malop  = this.authService.getMalop()
    this.monhoc = this.authService.getMsmh()
    this.hocky  = this.authService.getHocky()
    this.tengiangvien = authService.getTengiangvien()
    this.listthoikhoabieu.push(this.authService.getListTKB())
   
   }
  
  ngOnInit() {
    this.getPresentDateTime()
    this.getLopdiemdanh()
    this.checkDadiemdanh()
  }
  // get present date time
  getPresentDateTime()
  {
    // thứ hiện tại
    let thuhientai = "Thứ " + (this.day.getDay() + 1) + ""
    if(thuhientai == "Thứ 1")
    {
      thuhientai = "Chủ Nhật"
    }
    this.thungaythangnamhientai = thuhientai + " " + this.day.getDate() + "-" + (this.day.getMonth() + 1) + "-" + this.day.getFullYear()
  }
  // get trạng thái click của ion-checkbox
  getStatus(event)
  {
    this.chontatca = event.detail.checked
  }

  /**
   * Đầu tiên listsvvangmat = listsinhvien (tại vì lúc đầu listsv chưa được check nếu được sv nào được check thì là đã đi học), listsvdihoc = []
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

  /**
   * 
   */
  getLopdiemdanh()
  {
    this.afDB.list('danhsachsinhvienk18').valueChanges().subscribe(res =>
      {
        let danhsachsv : any = res
        danhsachsv.filter(item_sv =>{
          if(item_sv.A == this.malop)
          {
            this.listsinhvien.push(item_sv)
            this.listsvvanghoc.push(item_sv.D)
            this.soluongsinhvien =  this.listsinhvien.length
          }
        })
      })
  }

  /**
     * đầu tiên : lọc ra phần tử điểm danh thõa điều kiện : lop, monhoc, ngaydiemdanh trùng nhau (của firebase và biến truyền qua) thì xuống phía dưới so sánh thời gian
     * Dưới đây mình sẽ trả về lớp này đã điểm danh hay chưa với biến dadiemdanhroi : boolean
     * nếu listdiemdanh nó tồn tại: giodiemdanh >= giobatdau và giodiemdanh <= gioketthuc 
     *    tức là đã điểm danh rồi => thì biến dadiemdanhroi = true ngược lại = false
     * 
     */
  checkDadiemdanh()
  {
    this.afDB.list('diemdanh').valueChanges().subscribe(res=>
      { 
        this.listdiemdanh = res
        for(let ldd of this.listdiemdanh)
        {
          if(ldd.lop == this.malop && ldd.monhoc == this.monhoc && ldd.ngaydiemdanh == this.thungaythangnamhientai)
          {
           for(let ltkb of this.listthoikhoabieu)
           {
             // giobatdau va gioketthuc trên firebase có dạng : Tiết x - giờ:phút => bây giờ mình sẽ cắt giờ với phút ra                                    phần tử: 012345678    
             var giophutbatdau = ltkb.giobatdau.split("-")[1].slice(1) // giobatdau cắt ra khi gặp dấu "-" lấy phần tử thứ 1, sau đó cắt tại phần tử thứ 1 đến hết   _gio:phut (_ là khoảng trống)
             var giophutketthuc = ltkb.gioketthuc.split("-")[1].slice(1) 
             // format qua dạng Date để so sánh
             let giobatdau = new Date(null,null,null, giophutbatdau.split(":")[0], giophutbatdau.split(":")[1]) // nam,thang,ngay, gio, phut
             let gioketthuc = new Date(null,null,null, giophutketthuc.split(":")[0], giophutketthuc.split(":")[1]) // nam,thang,ngay, gio, phut
             let giodiemdanh = new Date(null,null,null, ldd.giodiemdanh.split(":")[0], ldd.giodiemdanh.split(":")[1]) // nam,thang,ngay, gio, phut
             
             if(giodiemdanh >= giobatdau && giodiemdanh <= gioketthuc)
             {
                this.dadiemdanhroi = true 
             }
             else 
             {
               this.dadiemdanhroi = false
             }
           }
          }
        }

      })
  }

  xemThongtindiemdanh()
  {
    this.authService.setNgaydiemdanh(this.thungaythangnamhientai)
    this.router.navigate(['thongtindiemdanh'])
  }
  sendDiemDanh()
  {
      //console.log('List sv vắng học :' ,this.listsvvanghoc)
      //console.log('sv đi học', this.listsvdihoc)
    if(this.listsvdihoc.length > 0 || this.listsvvanghoc.length > 0)
    {
      this.presentAlert()
    }
    else
    {
      this.authService.presentAlert4('Bạn vui lòng chọn dấu tick nếu sinh viên có mặt và ngược lại, sau đó mới bấm điểm danh.')
    }
  }
  async presentAlert() {
    //alert
    const alert = await this.alert.create({
      header: 'Thông báo',
      message: 'Danh sách điểm danh này sẽ được gửi lên sever và sẽ không thể thay đổi gì sau khi đã gửi!',
      buttons: [
        {
          text: 'Quay lại',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Gửi lên sever',
          cssClass: 'secondary',
          handler: () => {
            this.sendtoSever()
          }
        }
      ]
    });

    await alert.present();
  }
  //toast
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Gửi thông tin điểm danh thành công',
      duration: 3000,
    });
    await toast.present();
  }

  // push data to firebase
  sendtoSever()
  {
    // get gia tri id
    let id = 0
    for(let dd of this.listdiemdanh)
    {
      if(dd.id != null)
      {
        id = dd.id
      } 
    }
    // gan gia tri 
    let autoID                  = id + 1
    let giodiemdanh             = this.day.getHours() + ":" + this.day.getMinutes()
    let soluongsinhviendihoc    = this.listsvdihoc.length
    let soluongsinhvienvanghoc  = this.listsvvanghoc.length
    let danhsachsinhviendihoc   = this.listsvdihoc
    let danhsachsinhvienvanghoc = this.listsvvanghoc
    let tongsinhvien            = this.soluongsinhvien
    let tengiangvien            = this.authService.getTengiangvien()
    // tao bien data
    let data : DiemDanh = {
      id                : autoID,
      hocky             : this.hocky,
      lop               : this.malop,
      monhoc            : this.monhoc,
      giangvienday      : tengiangvien,
      ngaydiemdanh      : this.thungaythangnamhientai,
      giodiemdanh       : giodiemdanh,
      danhsachSVdihoc   : danhsachsinhviendihoc,
      danhsachSVvanghoc : danhsachsinhvienvanghoc,
      soluongSVdihoc    : soluongsinhviendihoc,
      soluongSVvanghoc  : soluongsinhvienvanghoc,
      tongsoSV          : tongsinhvien
    }
    console.log(data)
    // push data lên firebase
    this.afDB.list('diemdanh').push(data).then(res=>
      {
        this.authService.setNgaydiemdanh(this.thungaythangnamhientai)
        this.presentToast()
        this.router.navigate(['thongtindiemdanh'])
      })
  }    
  
}
