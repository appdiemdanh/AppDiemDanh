import { NgModule, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router } from '@angular/router';

// tạo routes
let routes : Routes = []

// lấy giá trị lưu từ local về 
let email         = localStorage.getItem('email')
let password      = localStorage.getItem('password')
let chucvu        = localStorage.getItem('chucvu')
let magiangvien   = localStorage.getItem('magiangvien')

/**
 * Nếu email và password đều rỗng (người dùng không bấm lưu mật khẩu) thì ta sẽ cho routes load page đầu tiên là page Dangnhap
 * Ngược lại nếu người dùng bấm lưu mật khẩu thì ta sẽ cho routes đi thẳng vào page của người dùng đó luôn với key để so sánh là chức vụ (vd page daotao, congtacsv,..)
 * 
 */
if(email == null && password == null)
{
  routes = [
    {
      path: '',
      loadChildren: () => import('./page_login/dangnhap/dangnhap.module').then(m => m.DangnhapPageModule)
    },
    { 
      path: 'chonchucvu',
      loadChildren: () => import('./page_login/chonchucvu/welcom.module').then( m => m.WelcomPageModule)
    },
    {
      path: 'dangnhap',
      loadChildren: () => import('./page_login/dangnhap/dangnhap.module').then(m => m.DangnhapPageModule)
    },
    {
      path: 'tabs',
      loadChildren: () => import('./page_daotao/tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
      path: 'tab1',
      loadChildren: () => import('./page_daotao/tab1/tab1.module').then( m => m.Tab1PageModule)
    },
    {
      path: 'tab2',
      loadChildren: () => import('./page_daotao/tab2/tab2.module').then( m => m.Tab2PageModule)
    },
    {
      path: 'tab3',
      loadChildren: () => import('./page_daotao/tab3/tab3.module').then( m => m.Tab3PageModule)
    },
    {
      path: 'tab4',
      loadChildren: () => import('./page_daotao/tab4/tab4.module').then( m => m.Tab4PageModule)
    },
    {
      path: 'tab5',
      loadChildren: () => import('./page_daotao/tab5/tab5.module').then( m => m.Tab5PageModule)
    },
    {
      path: 'quenmatkhau',
      loadChildren: () => import('./page_login/quenmatkhau/quenmatkhau.module').then( m => m.QuenmatkhauPageModule)
    },
    {
      path: 'dangky',
      loadChildren: () => import('./page_login/dangky/dangky.module').then( m => m.DangkyPageModule)
    },
    {
      path: 'home',
      loadChildren: () => import('./page_daotao/home/home.module').then( m => m.HomePageModule)
    },
    {
      path: 'verify-email',
      loadChildren: () => import('./page_login/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
    },
    {
      path: 'chonmon',
      loadChildren: () => import('./page_congtacsv/chonmon/chonmon.module').then( m => m.ChonmonPageModule)
    },
    {
      path: 'lichsu',
      loadChildren: () => import('./page_congtacsv/lichsu/lichsu.module').then( m => m.LichsuPageModule)
    },
    {
      path: 'thongtinsv',
      loadChildren: () => import('./page_daotao/thongtinsv/thongtinsv.module').then( m => m.ThongtinsvPageModule)
    },
    {
      path: 'thongtin-gv',
      loadChildren: () => import('./page_daotao/thongtin-gv/thongtin-gv.module').then( m => m.ThongtinGvPageModule)
    },
    {
      path: 'thongtin-mh',
      loadChildren: () => import('./page_daotao/thongtin-mh/thongtin-mh.module').then( m => m.ThongtinMhPageModule)
    },
    {
      path: 'thongtinlop',
      loadChildren: () => import('./page_daotao/thongtinlop/thongtinlop.module').then( m => m.ThongtinlopPageModule)
    },
    {
      path: 'diemdanh',
      loadChildren: () => import('./page_giangvien/diemdanh/diemdanh.module').then( m => m.DiemdanhPageModule)
    },
    {
      path: 'thongtindiemdanh',
      loadChildren: () => import('./page_giangvien/thongtindiemdanh/thongtindiemdanh.module').then( m => m.ThongtindiemdanhPageModule)
    },
    {
      path: 'phangiohoc',
      loadChildren: () => import('./page_daotao/phangiohoc/phangiohoc.module').then( m => m.PhangiohocPageModule)
    },
    {
      path: 'thongtinphangio',
      loadChildren: () => import('./page_daotao/thongtinphangio/thongtinphangio.module').then( m => m.ThongtinphangioPageModule)
    },
    {
      path: 'thoikhoabieu',
      loadChildren: () => import('./page_giangvien/thoikhoabieu/thoikhoabieu.module').then( m => m.ThoikhoabieuPageModule)
    },
    {
      path: 'lichsudiemdanh',
      loadChildren: () => import('./page_giangvien/lichsudiemdanh/lichsudiemdanh.module').then( m => m.LichsudiemdanhPageModule)
    },
  
  ];
}
else // người dùng click nhớ mật khẩu
{
  if(chucvu == "daotao") // chức vụ là đào tạo thì chuyển đến trang daotao đầu tiên
  {
    routes = [
      {
        path: '',
        loadChildren: () => import('./page_daotao/tabs/tabs.module').then( m => m.TabsPageModule)
      },
      { 
        path: 'chonchucvu',
        loadChildren: () => import('./page_login/chonchucvu/welcom.module').then( m => m.WelcomPageModule)
      },
      {
        path: 'dangnhap',
        loadChildren: () => import('./page_login/dangnhap/dangnhap.module').then(m => m.DangnhapPageModule)
      },
      {
        path: 'tabs',
        loadChildren: () => import('./page_daotao/tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('./page_daotao/tab1/tab1.module').then( m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('./page_daotao/tab2/tab2.module').then( m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./page_daotao/tab3/tab3.module').then( m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('./page_daotao/tab4/tab4.module').then( m => m.Tab4PageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('./page_daotao/tab5/tab5.module').then( m => m.Tab5PageModule)
      },
      {
        path: 'quenmatkhau',
        loadChildren: () => import('./page_login/quenmatkhau/quenmatkhau.module').then( m => m.QuenmatkhauPageModule)
      },
      {
        path: 'dangky',
        loadChildren: () => import('./page_login/dangky/dangky.module').then( m => m.DangkyPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./page_daotao/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'verify-email',
        loadChildren: () => import('./page_login/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
      },
      {
        path: 'chonmon',
        loadChildren: () => import('./page_congtacsv/chonmon/chonmon.module').then( m => m.ChonmonPageModule)
      },
      {
        path: 'lichsu',
        loadChildren: () => import('./page_congtacsv/lichsu/lichsu.module').then( m => m.LichsuPageModule)
      },
      {
        path: 'thongtinsv',
        loadChildren: () => import('./page_daotao/thongtinsv/thongtinsv.module').then( m => m.ThongtinsvPageModule)
      },
      {
        path: 'thongtin-gv',
        loadChildren: () => import('./page_daotao/thongtin-gv/thongtin-gv.module').then( m => m.ThongtinGvPageModule)
      },
      {
        path: 'thongtin-mh',
        loadChildren: () => import('./page_daotao/thongtin-mh/thongtin-mh.module').then( m => m.ThongtinMhPageModule)
      },
      {
        path: 'thongtinlop',
        loadChildren: () => import('./page_daotao/thongtinlop/thongtinlop.module').then( m => m.ThongtinlopPageModule)
      },
      {
        path: 'diemdanh',
        loadChildren: () => import('./page_giangvien/diemdanh/diemdanh.module').then( m => m.DiemdanhPageModule)
      },
      {
        path: 'thongtindiemdanh',
        loadChildren: () => import('./page_giangvien/thongtindiemdanh/thongtindiemdanh.module').then( m => m.ThongtindiemdanhPageModule)
      },
      {
        path: 'phangiohoc',
        loadChildren: () => import('./page_daotao/phangiohoc/phangiohoc.module').then( m => m.PhangiohocPageModule)
      },
      {
        path: 'thongtinphangio',
        loadChildren: () => import('./page_daotao/thongtinphangio/thongtinphangio.module').then( m => m.ThongtinphangioPageModule)
      },
      {
        path: 'thoikhoabieu',
        loadChildren: () => import('./page_giangvien/thoikhoabieu/thoikhoabieu.module').then( m => m.ThoikhoabieuPageModule)
      },
      {
        path: 'lichsudiemdanh',
        loadChildren: () => import('./page_giangvien/lichsudiemdanh/lichsudiemdanh.module').then( m => m.LichsudiemdanhPageModule)
      },
    
    ];
  }
  else if(chucvu == "giangvien") // chức vụ giảng viên thì chuyển đến trang giảng viên
  {
    routes = [
      {
        path: '',
        loadChildren: () => import('./page_giangvien/thoikhoabieu/thoikhoabieu.module').then( m => m.ThoikhoabieuPageModule)
      },
      { 
        path: 'chonchucvu',
        loadChildren: () => import('./page_login/chonchucvu/welcom.module').then( m => m.WelcomPageModule)
      },
      {
        path: 'dangnhap',
        loadChildren: () => import('./page_login/dangnhap/dangnhap.module').then(m => m.DangnhapPageModule)
      },
      {
        path: 'tabs',
        loadChildren: () => import('./page_daotao/tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('./page_daotao/tab1/tab1.module').then( m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('./page_daotao/tab2/tab2.module').then( m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./page_daotao/tab3/tab3.module').then( m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('./page_daotao/tab4/tab4.module').then( m => m.Tab4PageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('./page_daotao/tab5/tab5.module').then( m => m.Tab5PageModule)
      },
      {
        path: 'quenmatkhau',
        loadChildren: () => import('./page_login/quenmatkhau/quenmatkhau.module').then( m => m.QuenmatkhauPageModule)
      },
      {
        path: 'dangky',
        loadChildren: () => import('./page_login/dangky/dangky.module').then( m => m.DangkyPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./page_daotao/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'verify-email',
        loadChildren: () => import('./page_login/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
      },
      {
        path: 'chonmon',
        loadChildren: () => import('./page_congtacsv/chonmon/chonmon.module').then( m => m.ChonmonPageModule)
      },
      {
        path: 'lichsu',
        loadChildren: () => import('./page_congtacsv/lichsu/lichsu.module').then( m => m.LichsuPageModule)
      },
      {
        path: 'thongtinsv',
        loadChildren: () => import('./page_daotao/thongtinsv/thongtinsv.module').then( m => m.ThongtinsvPageModule)
      },
      {
        path: 'thongtin-gv',
        loadChildren: () => import('./page_daotao/thongtin-gv/thongtin-gv.module').then( m => m.ThongtinGvPageModule)
      },
      {
        path: 'thongtin-mh',
        loadChildren: () => import('./page_daotao/thongtin-mh/thongtin-mh.module').then( m => m.ThongtinMhPageModule)
      },
      {
        path: 'thongtinlop',
        loadChildren: () => import('./page_daotao/thongtinlop/thongtinlop.module').then( m => m.ThongtinlopPageModule)
      },
      {
        path: 'diemdanh',
        loadChildren: () => import('./page_giangvien/diemdanh/diemdanh.module').then( m => m.DiemdanhPageModule)
      },
      {
        path: 'thongtindiemdanh',
        loadChildren: () => import('./page_giangvien/thongtindiemdanh/thongtindiemdanh.module').then( m => m.ThongtindiemdanhPageModule)
      },
      {
        path: 'phangiohoc',
        loadChildren: () => import('./page_daotao/phangiohoc/phangiohoc.module').then( m => m.PhangiohocPageModule)
      },
      {
        path: 'thongtinphangio',
        loadChildren: () => import('./page_daotao/thongtinphangio/thongtinphangio.module').then( m => m.ThongtinphangioPageModule)
      },
      {
        path: 'thoikhoabieu',
        loadChildren: () => import('./page_giangvien/thoikhoabieu/thoikhoabieu.module').then( m => m.ThoikhoabieuPageModule)
      },
      {
        path: 'lichsudiemdanh',
        loadChildren: () => import('./page_giangvien/lichsudiemdanh/lichsudiemdanh.module').then( m => m.LichsudiemdanhPageModule)
      },
    
    ];
  }
  else // chuc vu la congtacsinhvien
  {
    routes = [
      {
        path: '',
        loadChildren: () => import('./page_congtacsv/chonmon/chonmon.module').then( m => m.ChonmonPageModule)
      },
      { 
        path: 'chonchucvu',
        loadChildren: () => import('./page_login/chonchucvu/welcom.module').then( m => m.WelcomPageModule)
      },
      {
        path: 'dangnhap',
        loadChildren: () => import('./page_login/dangnhap/dangnhap.module').then(m => m.DangnhapPageModule)
      },
      {
        path: 'tabs',
        loadChildren: () => import('./page_daotao/tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('./page_daotao/tab1/tab1.module').then( m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('./page_daotao/tab2/tab2.module').then( m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./page_daotao/tab3/tab3.module').then( m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('./page_daotao/tab4/tab4.module').then( m => m.Tab4PageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('./page_daotao/tab5/tab5.module').then( m => m.Tab5PageModule)
      },
      {
        path: 'quenmatkhau',
        loadChildren: () => import('./page_login/quenmatkhau/quenmatkhau.module').then( m => m.QuenmatkhauPageModule)
      },
      {
        path: 'dangky',
        loadChildren: () => import('./page_login/dangky/dangky.module').then( m => m.DangkyPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./page_daotao/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'verify-email',
        loadChildren: () => import('./page_login/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
      },
      {
        path: 'chonmon',
        loadChildren: () => import('./page_congtacsv/chonmon/chonmon.module').then( m => m.ChonmonPageModule)
      },
      {
        path: 'lichsu',
        loadChildren: () => import('./page_congtacsv/lichsu/lichsu.module').then( m => m.LichsuPageModule)
      },
      {
        path: 'thongtinsv',
        loadChildren: () => import('./page_daotao/thongtinsv/thongtinsv.module').then( m => m.ThongtinsvPageModule)
      },
      {
        path: 'thongtin-gv',
        loadChildren: () => import('./page_daotao/thongtin-gv/thongtin-gv.module').then( m => m.ThongtinGvPageModule)
      },
      {
        path: 'thongtin-mh',
        loadChildren: () => import('./page_daotao/thongtin-mh/thongtin-mh.module').then( m => m.ThongtinMhPageModule)
      },
      {
        path: 'thongtinlop',
        loadChildren: () => import('./page_daotao/thongtinlop/thongtinlop.module').then( m => m.ThongtinlopPageModule)
      },
      {
        path: 'diemdanh',
        loadChildren: () => import('./page_giangvien/diemdanh/diemdanh.module').then( m => m.DiemdanhPageModule)
      },
      {
        path: 'thongtindiemdanh',
        loadChildren: () => import('./page_giangvien/thongtindiemdanh/thongtindiemdanh.module').then( m => m.ThongtindiemdanhPageModule)
      },
      {
        path: 'phangiohoc',
        loadChildren: () => import('./page_daotao/phangiohoc/phangiohoc.module').then( m => m.PhangiohocPageModule)
      },
      {
        path: 'thongtinphangio',
        loadChildren: () => import('./page_daotao/thongtinphangio/thongtinphangio.module').then( m => m.ThongtinphangioPageModule)
      },
      {
        path: 'thoikhoabieu',
        loadChildren: () => import('./page_giangvien/thoikhoabieu/thoikhoabieu.module').then( m => m.ThoikhoabieuPageModule)
      },
      {
        path: 'lichsudiemdanh',
        loadChildren: () => import('./page_giangvien/lichsudiemdanh/lichsudiemdanh.module').then( m => m.LichsudiemdanhPageModule)
      },
    
    ];
  }
}



@NgModule({   
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{ 

  
}
