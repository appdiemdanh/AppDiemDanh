import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/dangnhap/dangnhap.module').then(m => m.DangnhapPageModule)
  },
  {
    path: 'dangnhap',
    loadChildren: () => import('./page/dangnhap/dangnhap.module').then(m => m.DangnhapPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./page/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./page/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./page/tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./page/tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./page/tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./page/tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./page/tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'quenmatkhau',
    loadChildren: () => import('./page/quenmatkhau/quenmatkhau.module').then( m => m.QuenmatkhauPageModule)
  },
  {
    path: 'dangky',
    loadChildren: () => import('./page/dangky/dangky.module').then( m => m.DangkyPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
