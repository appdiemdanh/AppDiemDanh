import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  listdiemdanh_real = []
  listdiemdanh_temp = []
  listsinhvien = []
  thongtinvanghoc_temp = []
  thongtinvanghoc_real = []
  listcamthi_temp = []
  listcamthi_real = []

  // ion - select
  listloctheo   = ['Môn học','Lớp','Cả 2 cái trên']
  listlop       = []
  listmonhoc    = []
  loctheo       = ''
  monhoc        = ' Tất cả môn học '
  malop         = 'Tất cả lớp'

  constructor(
    public afDB : AngularFireDatabase,
    public authService : AuthenticationService,
    public router : Router
  )
  {}

  ngOnInit() {
    this.getListMonhoc()
    this.getListLop()  
    this.getDanhsachSVbicamthi()
  }

  // from firebase
  getListLop()
  {
    this.afDB.list('danhsachlop').valueChanges().subscribe(res => {
      let danhsachlop : any = res
      this.listlop = ['Tất cả lớp']
      danhsachlop.filter(dataLop =>
        {
          this.listlop.push(dataLop.B)
        })
    })
  }
  getListMonhoc()
  {
    this.afDB.list('danhsachmonhoc').valueChanges().subscribe(res => 
      {
        let danhsachmonhoc : any = res
        this.listmonhoc = ['Tất cả môn học']
        danhsachmonhoc.filter(dataMonhoc =>
          {
            this.listmonhoc.push(dataMonhoc.D)
          })
      })
  }
  // ion - select
  getLoctheo(event)
  {
    this.loctheo = event.detail.value
    // nếu người dùng click vô thì tự động trả về giá trị ban đầu của lớp và môn do có khi người dùng không chọn hay thay đổi từ chọn môn sang chọn lớp 
    this.monhoc = ' Tất cả môn học '
    this.malop  = 'Tất cả lớp'
  }
  getMonhoc(event)
  {
    this.monhoc = ' ' + event.detail.value + ' '
  }
  getLop(event)
  {
    this.malop = event.detail.value
  }

  // 
  getDanhsachsinhvien()
  {
    this.afDB.list('danhsachsinhvienk18').valueChanges().subscribe(res =>
      {
        this.listsinhvien = []
        this.listsinhvien = res
      })
  }

  /**
   * Chạy qua từng sinh viên => tạo mảng vanghoc_temp chứa tất cả dữ liệu vắng học từ ('diemdanh')
   * => gán giá trị đầu tiên của mảng vanghoc_temp cho mảng vanghoc_real sau đó xóa giá trị đó đi
   * => so sánh mảng vanghoc_real và vanghoc_temp xem nếu môn học trùng học kỳ thì kiểm tra có trùng môn không để push cho hợp lý,
   *    nếu không trùng thì push thẳng phần tử từ mảng vanghoc_temp vô mảng vanghoc_real (đầy đủ thông tin bao gồm cả học kỳ)
   * => khi đã có được mảng vanghoc_real rồi thì kiểm tra nếu vắng trên 3 buổi(dựa vào length của chitiet, console ra mảng vanghoc_real sẽ rõ)
   *    thì push vô mảng camthi_temp sau đó chuyển qua sinh viên tiếp theo để làm tương tự
   * => cuối cùng gọi hàm lọc mảng camthi_temp khi người dùng chọn lọc theo môn học hoặc lớp trên giao diện thì mình push mảng camthi_temp lọc được vào mảng camthi_real
   */
  getDanhsachSVbicamthi()
  {
    let sothutu : number = 0
    this.getDanhsachsinhvien()
    // gán tất cả thongtindiem thõa điều kiện cùng tên sinh viên vào list_temp
    this.afDB.list('diemdanh').valueChanges().subscribe(res => 
      {
        this.listcamthi_temp = [] // tránh mảng cộng dồn khi có dữ liệu mới
        for (let s = 0; s < this.listsinhvien.length; s ++)
        {
          this.thongtinvanghoc_temp = []
          this.thongtinvanghoc_real = [] // tránh cộng dồn mảng khi có dữ liệu mới 
          let listDiemdanh : any = res
          listDiemdanh.filter(ldd => 
            {
              ldd.danhsachSVvanghoc.filter(lvh =>
                {
                  if (lvh == this.listsinhvien[s].D)
                  {
                    this.thongtinvanghoc_temp.push(ldd)
                  }
                })
            })
          /**
           *  so sánh các điều kiện về trùng học kỳ, trùng môn học để push từ list_temp qua list_real
           */
          if (this.thongtinvanghoc_temp.length != 0)
          {
            // push phần tử đầu tiên của list_temp vô list_real để có dữ liệu hocky, monhoc, ... xuống dưới so sánh
            this.thongtinvanghoc_real.push({
              hocky : this.thongtinvanghoc_temp[0].hocky,
                listmonhoc : 
                [
                  {
                    monhoc : this.thongtinvanghoc_temp[0].monhoc,
                    chitiet : 
                    [
                      {
                        ngayvanghoc : this.thongtinvanghoc_temp[0].ngaydiemdanh,
                        giangvienday : this.thongtinvanghoc_temp[0].giangvienday
                      }
                    ]  
                  }
                ]
              })
            // sau khi push phần tử đầu tiên từ temp vô real thì phải xóa phần tử đó ở temp đi để khỏi duyệt qua nó nữa
            this.thongtinvanghoc_temp.splice(0, 1)
            for (let i = 0; i < this.thongtinvanghoc_temp.length; i ++)
            {
              for (let j = 0; j < this.thongtinvanghoc_real.length; j ++)
              {
                // môn học chuẩn bị push vào list_real trùng học kỳ
                if (this.thongtinvanghoc_temp[i].hocky == this.thongtinvanghoc_real[j].hocky) 
                {
                  // kiểm tra xem môn học của list_temp trùng học kỳ mà có trùng môn học với list_real hay không? 
                  for (let k = 0; k < this.thongtinvanghoc_real[j].listmonhoc.length; k ++)
                  {
                    if (this.thongtinvanghoc_temp[i].monhoc == this.thongtinvanghoc_real[j].listmonhoc[k].monhoc) // nếu trùng môn 
                    {
                      this.thongtinvanghoc_real[j].listmonhoc[k].chitiet.push({ // thì vô chi tiết của môn đó push
                        ngayvanghoc : this.thongtinvanghoc_temp[i].ngaydiemdanh,
                        giangvienday : this.thongtinvanghoc_temp[i].giangvienday
                      })
                      // cho k = vị trí cuối cùng để thoát vòng lặp for(k) chạy qua vòng lặp for(j)
                      k = this.thongtinvanghoc_real[j].listmonhoc[k].length
                    }
                    else // nếu khác môn 
                    {
                      // nếu k chạy đến cuối rồi mà vẫn khác môn thì mới vô đây
                      if (k == this.thongtinvanghoc_real[j].listmonhoc.length - 1) // kiểm tra xem đã duyệt qua hết phần tử của listmonhoc chưa (k = vị trí cuối của mảng)
                      {
                        this.thongtinvanghoc_real[j].listmonhoc.push({ // nếu rồi thì push sau đó break(dừng lại) hàm for (k) lại không làm nữa
                          monhoc : this.thongtinvanghoc_temp[i].monhoc,
                          chitiet : 
                          [
                            {
                              ngayvanghoc : this.thongtinvanghoc_temp[i].ngaydiemdanh,
                              giangvienday : this.thongtinvanghoc_temp[i].giangvienday
                            }
                          ]
                        })
                        // cho k = vị trí cuối cùng để thoát vòng lặp for(k) chạy qua vòng lặp for(j)
                        k = this.thongtinvanghoc_real[j].listmonhoc[k].length
                      }
                    }
                  }
                  // nếu môn học trùng học kỳ và đã push vào list_real rồi thì cho j không chạy (cho j = length =>  thoát vòng for())
                  j = this.thongtinvanghoc_real.length
                }
                // môn học chuẩn bị push vào list_real khác học kỳ
                else
                {
                  if (j == this.thongtinvanghoc_real.length - 1) // j chạy tới vị trí cuối cùng rồi mà vẫn không trùng 
                  {
                    //console.log('dã chạy hết', this.thongtinvanghoc_temp[i].monhoc)
                    this.thongtinvanghoc_real.push({ // thì push nguyên mảng bao gồm cả học kỳ vào list_real
                      hocky : this.thongtinvanghoc_temp[i].hocky,
                      listmonhoc : 
                      [
                        {
                          monhoc : this.thongtinvanghoc_temp[i].monhoc,
                          chitiet : 
                          [
                            {
                              ngayvanghoc : this.thongtinvanghoc_temp[i].ngaydiemdanh,
                              giangvienday : this.thongtinvanghoc_temp[i].giangvienday
                            }
                          ]
                        }
                      ]
                    })
                    // nếu môn học khác học kỳ đã push xong rồi thì mình sẽ tăng j lên 1 > this.thongtinvanghoc_real.length để nó thoát ra vòng for(j) để qua vòng for(i) 
                    ++j
                  }
                }
              }
            }
          }
          //console.log('list temp' ,this.thongtinvanghoc_temp)
          //console.log('list real của ' + this.listsinhvien[s].D, this.thongtinvanghoc_real)
          /**
           * Tính số buổi vắng học của mỗi sinh viên theo lớp và theo từng môn học
           */
          for (let a = 0; a < this.thongtinvanghoc_real.length; a ++)
          {
            for (let b = 0; b < this.thongtinvanghoc_real[a].listmonhoc.length; b ++)
            {
              let sobuoivang : number = this.thongtinvanghoc_real[a].listmonhoc[b].chitiet.length // console.log(this.thongtinvanghoc_real để hiểu)
              if (sobuoivang >= 3)
              {
                this.listcamthi_temp.push({
                  sothutu     : ++ sothutu,
                  tensinhvien : this.listsinhvien[s].D,
                  mssv        : this.listsinhvien[s].C,
                  lop         : this.listsinhvien[s].A,
                  hocky       : this.thongtinvanghoc_real[a].hocky,
                  monhoc      : this.thongtinvanghoc_real[a].listmonhoc[b].monhoc,
                  sobuoivang  : sobuoivang
                })
              } 
            }
          }
        }
        // gọi hàm lọc giá trị
        this.filterListcamthi()
      })
  }

  /**
   * Đây là hàm lọc giá trị của listcamthi thông qua các điều kiện của ion-select môn học và lớp học
   */
  filterListcamthi()
  {
    let stt = 0
    this.listcamthi_real = [] // khởi tạo = rỗng và nếu vô vòng for mà không thõa if nào thì nó vẫn là rỗng
    for (let i = 0; i < this.listcamthi_temp.length; i ++)
    {
      // monhoc == tất cả mon học hoặc chưa chọn môn học thì mạc định nó là tất cả môn học rồi
      if (this.monhoc == ' Tất cả môn học ')
      {
        if (this.malop == 'Tất cả lớp')
        {
          this.listcamthi_real = this.listcamthi_temp
        }
        else if (this.listcamthi_temp[i].lop == this.malop)
        {
          stt += 1
          this.listcamthi_real.push({
            sothutu : stt,
            tensinhvien : this.listcamthi_temp[i].tensinhvien,
            mssv : this.listcamthi_temp[i].mssv,
            monhoc : this.listcamthi_temp[i].monhoc
          })
        }
      }
      // Ngược lại nếu list_temp nào có môn học == monhoc thì đi vào trong
      else if (this.listcamthi_temp[i].monhoc == this.monhoc)
      {
        if (this.malop == 'Tất cả lớp')
        {
          stt += 1
          this.listcamthi_real.push({
            sothutu : stt,
            tensinhvien : this.listcamthi_temp[i].tensinhvien,
            mssv : this.listcamthi_temp[i].mssv,
            monhoc : this.listcamthi_temp[i].monhoc
          })
        }
        else if (this.listcamthi_temp[i].lop == this.malop)
        {
          stt += 1
          this.listcamthi_real.push({
            sothutu : stt,
            tensinhvien : this.listcamthi_temp[i].tensinhvien,
            mssv : this.listcamthi_temp[i].mssv,
            monhoc : this.listcamthi_temp[i].monhoc,
          })
        }
      }
      // ngược lại tự thoát vòng for
    }
    // toast ra số lượng sinh viên bị cấm thi
    if (this.listcamthi_real.length != 0)
    {
      this.authService.presentToast('Có ' + this.listcamthi_real.length + ' sinh viên bị cấm thi', 1400)
    }
    console.log('sinh viên vắng từ 3 buổi ', this.listcamthi_real)
  }

  /**
   * @param masv : mã sinh viên được truyền qua khi click từng item của list cấm thi
   */
  xemThongtinsinhvien(masv)
  {
    this.authService.setMssv(masv)
    this.router.navigate(['thongtin-sv'])
  }

}

