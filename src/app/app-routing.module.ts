import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page_login/hello/hello.module').then(m => m.HelloPageModule)
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
    path: '',
    loadChildren: () => import('./page_daotao/tabs/tabs.module').then(m => m.TabsPageModule)
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
    path: 'hello',
    loadChildren: () => import('./page_login/hello/hello.module').then( m => m.HelloPageModule)
  },  {
    path: 'chonchucvu2',
    loadChildren: () => import('./page_login/chonchucvu2/chonchucvu2.module').then( m => m.Chonchucvu2PageModule)
  },
  {
    path: 'chonlop',
    loadChildren: () => import('./page_congtacsv/chonlop/chonlop.module').then( m => m.ChonlopPageModule)
  },
  {
    path: 'chonmon',
    loadChildren: () => import('./page_congtacsv/chonmon/chonmon.module').then( m => m.ChonmonPageModule)
  }


 


];

@NgModule({   
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
