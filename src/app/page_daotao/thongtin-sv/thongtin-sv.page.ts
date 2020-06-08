import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authenticatin-Service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thongtin-sv',
  templateUrl: './thongtin-sv.page.html',
  styleUrls: ['./thongtin-sv.page.scss'],
})
export class ThongtinSvPage implements OnInit {

  mssv = ''
  tensv = ''
  hocky = ''
  tongsobuoivang = 0
  sobuoivang = 0
  isShowHocky = false
  isShowMonhoc = false
  isShowBuoivang = false
  thongtinvanghoc_real = []
  thongtinvanghoc_temp = []
  listThongtinvanghoc = []
  thongtinsinhvien = []
  listMonhoc = []
  toMaubutton = false

  constructor(
    public authService : AuthenticationService,
    public afDB        : AngularFireDatabase,
    public router      : Router
  ) { 
    this.mssv = this.authService.getMssv()
  }

  ngOnInit() {
    this.getThongtinSV()
    this.getThongtinvanghoc()
  }

  /**
   * 
   * @param monhoc : môn học được truyền qua khi click vào item môn học
   */
  xemChitietvanghoc(monhoc)
  {
    this.toMaubutton = true
    this.authService.setListthongtinvanghoc(this.thongtinvanghoc_real)
    this.authService.setTenmonhoc(monhoc)
    this.router.navigate(['chitiet-vanghoc']).then(res =>{
      this.toMaubutton = false
    })
  }
  
  getThongtinSV()
  {
    this.afDB.list('danhsachsinhvienk18').valueChanges().subscribe(res =>{
      let danhsachsv : any = res
      danhsachsv.filter(listsv =>
        {
          if (listsv.C == this.mssv)
          {
            this.thongtinsinhvien.push(listsv)
            this.tensv = listsv.D
          }
        })
    }) 

  }

  getThongtinvanghoc()
  {
    // gán tất cả thongtindiem thõa điều kiện cùng tên sinh viên vào list_temp
    this.afDB.list('diemdanh').valueChanges().subscribe(res => 
      {
        this.thongtinvanghoc_real = [] // tránh cộng dồn mảng khi có dữ liệu mới 
        let listDiemdanh : any = res
        listDiemdanh.filter(ldd => 
          {
            ldd.danhsachSVvanghoc.filter(lvh =>
              {
                if (lvh == this.tensv)
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
          // kiểm tra môn học trước khi push có trùng học kỳ với môn học trong list_real hay không?
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
                    //console.log('trùng môn học', this.thongtinvanghoc_temp[i].monhoc)
                    this.thongtinvanghoc_real[j].listmonhoc[k].chitiet.push({ // thì vô chi tiết của môn đó push
                      ngayvanghoc : this.thongtinvanghoc_temp[i].ngaydiemdanh,
                      giangvienday : this.thongtinvanghoc_temp[i].giangvienday
                    })
                    // cho k = vị trí cuối cùng để thoát vòng lặp for(k) chạy qua vòng lặp for(j)
                    k = this.thongtinvanghoc_real[j].listmonhoc[k].length
                  }
                  else // nếu khác môn 
                  {
                    //console.log('khác môn học', this.thongtinvanghoc_temp[i].monhoc)
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
        // get tổng buổi vắng
        for (let i = 0; i < this.thongtinvanghoc_real.length; i ++)
        {
          for (let lmh of this.thongtinvanghoc_real[i].listmonhoc)
          {
            this.tongsobuoivang += lmh.chitiet.length // qua mỗi vòng lặp thì số buổi vắng cộng thêm length của list chitiet thứ i
          }
        }
        //console.log('list temp' ,this.thongtinvanghoc_temp)
        console.log('list real', this.thongtinvanghoc_real)
      })
  }

}
