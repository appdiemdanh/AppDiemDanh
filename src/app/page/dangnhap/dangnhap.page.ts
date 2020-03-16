import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.page.html',
  styleUrls: ['./dangnhap.page.scss'],
})
export class DangnhapPage implements OnInit {

  constructor(public navCtrl : NavController) { }

  ngOnInit() {
    
  }
 
  user = '';
  password = '';
  chucvu = 'rd_gv' // gan chuc vu dau tien la giao vien
  

  // list user
   // list user
   list_user = [{
    us : 'Admin1',
    pw : '123456',
    cv : 'rd_gv' 
   },
   {
     us : 'Admin2',
     pw : '123456',
     cv : 'rd_dt' 
   },
   {
     us : 'Admin3',
     pw : '123456',
     cv : 'rd_ctsv' 
   }];


   // get user and password
   /*
   getUser(event)
   {
    //console.log(event.target.value);
    this.user = event.target.value;
   }
   */
   getPassword(event)
   {
    this.password = event.target.value;
   }

   // get id
   getId(event)
   {
     //console.log(event.target.id);
     this.chucvu = event.target.id;
     //console.log(this.chucvu);
   }

   // quen mat khau
   quenmatkhau()
   {
     alert('Chức năng hiện tại đang nâng cấp!');
   }

   // dieu kien login
   eventLogin()
   {
     //console.log(this.user); // test ngModel lay data tu edittext
    //if((this.user == "Admin1" && this.password == "123456" && this.chucvu == "rd_gv") ||
      //(this.user == "Admin2" && this.password == "123456" && this.chucvu == "rd_dt"   ||
      //(this.user == "Admin3" && this.password == "123456" && this.chucvu == "rd_ctsv")))
    if(this.user == "Admin2" && this.password == "123456" && this.chucvu == "rd_dt")
    {
      this.navCtrl.navigateForward('/tabs');
      console.log('Đăng nhập thành công');
    }
    else
    {
      alert('Đăng nhập thất bại');
    }
  }
}
