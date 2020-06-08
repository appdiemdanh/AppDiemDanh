import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongtinSvPage } from './thongtin-sv.page';

const routes: Routes = [
  {
    path: '',
    component: ThongtinSvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongtinSvPageRoutingModule {}
