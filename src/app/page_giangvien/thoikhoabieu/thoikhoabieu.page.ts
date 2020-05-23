import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-thoikhoabieu',
  templateUrl: './thoikhoabieu.page.html',
  styleUrls: ['./thoikhoabieu.page.scss'],
})
export class ThoikhoabieuPage implements OnInit {

  listthoikhoabieu = []
  listphangio : any = []
  listthu : any
  listlop : any
  listlophoc = []
  magiangvien = ''
  tengiangvien = ''
  day = new Date()
  isshowIonCard = true
  magvtontai = false
  toigiodiemdanh = false

  // format date time
  namthangngayhientai : Date
  giophuthientai : Date
  thuhientai : String

  // view ra toast
  monhoc = ''
  lophoc = ''

  constructor(
    public afDB : AngularFireDatabase,
    public router : Router,
    public authService : AuthenticationService,
    public toastController : ToastController
  ) {
    /*
     * magiangvien được set vào local khi đăng nhập(magiangvien lay tu listuser) nếu chức vụ đăng nhập là giảng viên
     * sau đó qua đây thì get ra để so sánh với magiangvien (phangiogiang)
     * nếu magiangvien(listuser) == magiangvien(phangiogiang) thì hiện ra ion-card để giảng viên đó xem giờ dạy của mình, col 9 html
     */
    this.magiangvien = localStorage.getItem('magiangvien')
    this.authService.presentLoading("Vui lòng chờ...", 1200)


    
  }
  ngOnInit() {
    
    // thực hiện formatDatetime()
    this.formatDatetime();

    /**
     * Đầu tiên gán giá trị cho listfirebase - col 1
     * Sau đó tạo vòng lặp để đọc giá trị của listfirebase - col 2
     * if 1 : magiangvien(firebase) == magiangvien(truyền từ đăng nhập qua)
     *    tại vì : trên firebase phangiogiang có rất nhiều giảng viên khác nhau và để phân biệt thời khóa biểu
     *    của từng giảng viên thì phải dựa vào magiangvien
     *    vd : giang viên A đăng nhập thì phải trả ra tkb của giảng viên A đó 
     * if 2 : điều kiện cho ngày hiện tại để view ra cho listthoikhoabieu 
     * if 3 : điều kiện cho thứ hiện tại == ngayhoc(firebase)
     * if 4 : điều kiện đến giờ học, hết giờ học hay chưa để truyền qua page điểm danh view danhsachsv, tenmonhoc tenlop
     *  Các điều kiện này lòng vào nhau nên qua mỗi vòng if nó sẽ lọc ra giá trị nào đúng với if rồi mới vào if tiếp theo lọc tiếp
     */
    this.afDB.list('phangiogiang').valueChanges().subscribe((res)=>{
      this.listphangio = res // col 1
      for(let listpg of this.listphangio) // col 2
      {
        if(listpg.magiangvien == this.magiangvien) // if 1
        {
          // gán mgv đã tồn tại
          this.magvtontai = true
          // gán giá trị cho listlop
          this.listlop = listpg

          // format ngaybatdau và ngayketthuc thành kiểu Date
          let nambatdau     = listpg.ngaybatdau.split("-")[0] // cắt listpg.ngaybatdau bằng dấu - và lấy phần tử đầu tiên được cắt ra
          let thangbatdau   = listpg.ngaybatdau.split("-")[1]
          let ngaybatdau    = listpg.ngaybatdau.split("-")[2]
          let namketthuc    = listpg.ngayketthuc.split("-")[0]
          let thangketthuc  = listpg.ngayketthuc.split("-")[1]
          let ngayketthuc   = listpg.ngayketthuc.split("-")[2]

          let ntnbatdau     = new Date(nambatdau, thangbatdau, ngaybatdau)
          let ntnketthuc    = new Date(namketthuc, thangketthuc, ngayketthuc)
          
          // so sánh ngày và giờ
          if(this.namthangngayhientai >= ntnbatdau) // if 2
          {
            if(this.namthangngayhientai <= ntnketthuc)
            {
              this.listthoikhoabieu.push(listpg)
              this.listthu = (listpg.ngayhoc)
              for(let thu of this.listthu)
              {
                if(this.thuhientai == thu)
                {
                  let giobatdau     = listpg.giobatdau.split("-")[1].split(":")[0]
                  let phutbatdau    = listpg.giobatdau.split("-")[1].split(":")[1]
                  let gioketthuc    = listpg.gioketthuc.split("-")[1].split(":")[0]
                  let phutketthuc   = listpg.gioketthuc.split("-")[1].split(":")[1]
                  //console.log(giobatdau)
                  const giophutbatdau = new Date(null,null,null, giobatdau, phutbatdau)
                  const giophutketthuc = new Date(null,null,null, gioketthuc, phutketthuc)
                  if(this.giophuthientai >= giophutbatdau) // if2
                  {
                    if(this.giophuthientai < giophutketthuc)
                    {
                      this.toigiodiemdanh = true
                      this.authService.setListTKB(listpg) // set listfb sau khi qua các điện để qua page diemdanh get ra so sánh
                      //console.log(listpg)
                      let malop = listpg.lop
                      let monhoc = listpg.tenmonhoc
                      // set gia trị
                      this.authService.setMalop(malop)
                      this.authService.setMsmh(monhoc)
                      //set gia tri de view ra Toast
                      this.monhoc = listpg.tenmonhoc
                      this.lophoc = listpg.lop
                    }
                  }
                }
              }
            }
          }
        }
      }
      // Nếu tới giờ điểm danh rồi thì toast thông báo
      if(this.toigiodiemdanh == true)
      {
        this.authService.presentToast("Tới giờ học môn : " + this.monhoc + ", Lớp : " + this.lophoc, 3000)
      }
    })
    // get ten giangvien điều kiện magiangvien(dangnhap truyen qua) = magiangvien(firebase)
    this.afDB.list('danhsachgiangvien').valueChanges().subscribe(res=>
      {
        let listgianvien : any = res
        for(let gv of listgianvien)
        {
          if(gv.B == this.magiangvien)
          {
            this.tengiangvien = gv.C 
            this.authService.setTengiangvien(this.tengiangvien)
            //console.log(this.tengiangvien)
          }
        }
      })
  }
  
  diemdanhSV()
  {   
    
    if(this.toigiodiemdanh == true)
    {
      this.router.navigate(['diemdanh'])
    }
    else
    {
      this.authService.presentAlert4('Xin lỗi, chưa đến giờ học nên không thể điểm danh.')
    }
  }
  logOut()
  {
    this.authService.SignOut()
  }

  // chuyển đổi ngày giờ từ string sang kiểu Date để có thể so sánh
  formatDatetime()
  {
    // ngày tháng năm hiện tại
    this.namthangngayhientai = new Date(this.day.getFullYear(), (this.day.getMonth() + 1), this.day.getDate())

    // thứ hiện tại
    this.thuhientai = "Thứ " + (this.day.getDay() + 1) + ""

    // giờ phút hiện tại
    this.giophuthientai = new Date(null,null,null, this.day.getHours(), this.day.getMinutes())
    if(this.thuhientai == "Thứ 1")
    {
      this.thuhientai = "Chủ nhật"
    }
  }

  

}