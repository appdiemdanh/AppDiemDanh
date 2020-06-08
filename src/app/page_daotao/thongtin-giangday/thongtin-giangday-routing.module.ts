import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongtinGiangdayPage } from './thongtin-giangday.page';

const routes: Routes = [
  {
    path: '',
    component: ThongtinGiangdayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongtinGiangdayPageRoutingModule {}
