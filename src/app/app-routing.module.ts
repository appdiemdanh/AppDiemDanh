import { NgModule, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router } from '@angular/router';

// tạo routes
let routes : Routes = []

let email : string = null
let password : string = null
// lấy giá trị lưu từ local về 
let chucvu        = localStorage.getItem('chucvu')

// Kiểm tra email password
let email_local     = localStorage.getItem('email')
let password_local  = localStorage.getItem('password') 
if (email_local != undefined && password_local != undefined)
{
  email     = email_local
  password  = password_local
}

/**
 * Nếu email và password == null (bằng giá trị ban đầu ) tức là người dùng không bấm lưu mật khẩu thì lần sau đăng nhập ta load page đăng nhập
 * Ngược lại thì chức vụ gì thì lần sau đăng nhập load vô page của chức vụ đó
 */
if (email == null && password == null)
{
  routes = [
    {
      path: '',
      loadChildren: () => import('./page_login/dangnhap/dangnhap.module').then(m => m.DangnhapPageModule)
    },
    { 
      path: 'chonchucvu',
      loadChildren: () => import('./page_login/chonchucvu/chonchucvu.module').then( m => m.ChonchucvuPageModule)
    },
    {
      path: 'xacthuc-email',
      loadChildren: () => import('./page_login/xacthuc-email/xacthuc-email.module').then(m => m.XacthucEmailPageModule)
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
      path: 'quenmatkhau',
      loadChildren: () => import('./page_login/quenmatkhau/quenmatkhau.module').then( m => m.QuenmatkhauPageModule)
    },
    {
      path: 'dangky',
      loadChildren: () => import('./page_login/dangky/dangky.module').then( m => m.DangkyPageModule)
    },
    {
      path: 'lichsu',
      loadChildren: () => import('./page_congtacsv/lichsu/lichsu.module').then( m => m.LichsuPageModule)
    },
    {
      path: 'thongtin-sv',
      loadChildren: () => import('./page_daotao/thongtin-sv/thongtin-sv.module').then( m => m.ThongtinSvPageModule)
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
      path: 'phangiogiang',
      loadChildren: () => import('./page_daotao/phangiogiang/phangiogiang.module').then(m => m.PhangiogiangPageModule)
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
    {
      path: 'chitiet-vanghoc',
      loadChildren: () => import('./page_daotao/chitiet-vanghoc/chitiet-vanghoc.module').then( m => m.ChitietVanghocPageModule)
    },
    {
      path: 'tabs_ctsv',
      loadChildren: () => import('./page_congtacsv/tabs/tabs.module').then( m => m.TabsPageModule)
    },
    {
      path: 'thongtin-giangday',
      loadChildren: () => import('./page_daotao/thongtin-giangday/thongtin-giangday.module').then( m => m.ThongtinGiangdayPageModule)
    }
  ];
}
else
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
        loadChildren: () => import('./page_login/chonchucvu/chonchucvu.module').then( m => m.ChonchucvuPageModule)
      },
      {
        path: 'xacthuc-email',
        loadChildren: () => import('./page_login/xacthuc-email/xacthuc-email.module').then(m => m.XacthucEmailPageModule)
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
        path: 'quenmatkhau',
        loadChildren: () => import('./page_login/quenmatkhau/quenmatkhau.module').then( m => m.QuenmatkhauPageModule)
      },
      {
        path: 'dangky',
        loadChildren: () => import('./page_login/dangky/dangky.module').then( m => m.DangkyPageModule)
      },
      {
        path: 'lichsu',
        loadChildren: () => import('./page_congtacsv/lichsu/lichsu.module').then( m => m.LichsuPageModule)
      },
      {
        path: 'thongtin-sv',
        loadChildren: () => import('./page_daotao/thongtin-sv/thongtin-sv.module').then( m => m.ThongtinSvPageModule)
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
        path: 'phangiogiang',
        loadChildren: () => import('./page_daotao/phangiogiang/phangiogiang.module').then(m => m.PhangiogiangPageModule)
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
      {
        path: 'chitiet-vanghoc',
        loadChildren: () => import('./page_daotao/chitiet-vanghoc/chitiet-vanghoc.module').then( m => m.ChitietVanghocPageModule)
      },
      {
        path: 'tabs_ctsv',
        loadChildren: () => import('./page_congtacsv/tabs/tabs.module').then( m => m.TabsPageModule)
      },
      {
        path: 'thongtin-giangday',
        loadChildren: () => import('./page_daotao/thongtin-giangday/thongtin-giangday.module').then( m => m.ThongtinGiangdayPageModule)
      }
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
        path: 'xacthuc-email',
        loadChildren: () => import('./page_login/xacthuc-email/xacthuc-email.module').then(m => m.XacthucEmailPageModule)
      },
      { 
        path: 'chonchucvu',
        loadChildren: () => import('./page_login/chonchucvu/chonchucvu.module').then( m => m.ChonchucvuPageModule)
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
        path: 'quenmatkhau',
        loadChildren: () => import('./page_login/quenmatkhau/quenmatkhau.module').then( m => m.QuenmatkhauPageModule)
      },
      {
        path: 'dangky',
        loadChildren: () => import('./page_login/dangky/dangky.module').then( m => m.DangkyPageModule)
      },
      {
        path: 'lichsu',
        loadChildren: () => import('./page_congtacsv/lichsu/lichsu.module').then( m => m.LichsuPageModule)
      },
      {
        path: 'thongtin-sv',
        loadChildren: () => import('./page_daotao/thongtin-sv/thongtin-sv.module').then( m => m.ThongtinSvPageModule)
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
        path: 'phangiogiang',
        loadChildren: () => import('./page_daotao/phangiogiang/phangiogiang.module').then(m => m.PhangiogiangPageModule)
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
      {
        path: 'chitiet-vanghoc',
        loadChildren: () => import('./page_daotao/chitiet-vanghoc/chitiet-vanghoc.module').then( m => m.ChitietVanghocPageModule)
      },
      {
        path: 'tabs_ctsv',
        loadChildren: () => import('./page_congtacsv/tabs/tabs.module').then( m => m.TabsPageModule)
      },
      {
        path: 'thongtin-giangday',
        loadChildren: () => import('./page_daotao/thongtin-giangday/thongtin-giangday.module').then( m => m.ThongtinGiangdayPageModule)
      }
    ];
  }
  else if(chucvu == "congtacsinhvien") // chuc vu la congtacsinhvien
  {
    routes = [
      {
        path: '',
        loadChildren: () => import('./page_congtacsv/tabs/tabs.module').then( m => m.TabsPageModule)
      },
      { 
        path: 'chonchucvu',
        loadChildren: () => import('./page_login/chonchucvu/chonchucvu.module').then( m => m.ChonchucvuPageModule)
      },
      {
        path: 'xacthuc-email',
        loadChildren: () => import('./page_login/xacthuc-email/xacthuc-email.module').then(m => m.XacthucEmailPageModule)
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
        path: 'quenmatkhau',
        loadChildren: () => import('./page_login/quenmatkhau/quenmatkhau.module').then( m => m.QuenmatkhauPageModule)
      },
      {
        path: 'dangky',
        loadChildren: () => import('./page_login/dangky/dangky.module').then( m => m.DangkyPageModule)
      },
      {
        path: 'lichsu',
        loadChildren: () => import('./page_congtacsv/lichsu/lichsu.module').then( m => m.LichsuPageModule)
      },
      {
        path: 'thongtin-sv',
        loadChildren: () => import('./page_daotao/thongtin-sv/thongtin-sv.module').then( m => m.ThongtinSvPageModule)
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
        path: 'phangiogiang',
        loadChildren: () => import('./page_daotao/phangiogiang/phangiogiang.module').then(m => m.PhangiogiangPageModule)
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
      {
        path: 'chitiet-vanghoc',
        loadChildren: () => import('./page_daotao/chitiet-vanghoc/chitiet-vanghoc.module').then( m => m.ChitietVanghocPageModule)
      },
      {
        path: 'tabs_ctsv',
        loadChildren: () => import('./page_congtacsv/tabs/tabs.module').then( m => m.TabsPageModule)
      },
      {
        path: 'thongtin-giangday',
        loadChildren: () => import('./page_daotao/thongtin-giangday/thongtin-giangday.module').then( m => m.ThongtinGiangdayPageModule)
      }
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
