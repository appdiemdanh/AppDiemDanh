import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongtinGvPage } from './thongtin-gv.page';

const routes: Routes = [
  {
    path: '',
    component: ThongtinGvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongtinGvPageRoutingModule {}
