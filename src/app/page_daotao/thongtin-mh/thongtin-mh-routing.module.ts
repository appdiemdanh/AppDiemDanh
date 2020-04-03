import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongtinMhPage } from './thongtin-mh.page';

const routes: Routes = [
  {
    path: '',
    component: ThongtinMhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongtinMhPageRoutingModule {}
