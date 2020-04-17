import { Component, OnInit } from '@angular/core';
import { DangnhapPage } from '../dangnhap/dangnhap.page'

@Component({
  selector: 'app-hello',
  templateUrl: './hello.page.html',
  styleUrls: ['./hello.page.scss'],
})
export class HelloPage implements OnInit {
  

  constructor(
    public dangnhapPage : DangnhapPage
  ) { 
    // tạo biến hứng giá trị lưu trong local
    let email : string = window.localStorage.getItem('email')
    let password : string = window.localStorage.getItem('password')
    //console.log(email)
    // nếu nó khác rỗng thì thực hiện gọi đến NgOnInit và login() để dăng nhập
    if(email != null && password != null)
      {
        this.dangnhapPage.ngOnInit()
        this.dangnhapPage.logIn()
      }
  }

  ngOnInit() {
  }

}
