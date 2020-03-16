import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DangnhapPage } from './dangnhap.page';

const routes: Routes = [
  {
    path: '',
    component: DangnhapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DangnhapPageRoutingModule {}
