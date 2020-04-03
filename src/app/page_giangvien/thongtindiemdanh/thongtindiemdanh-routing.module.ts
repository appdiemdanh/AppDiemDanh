import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongtindiemdanhPage } from './thongtindiemdanh.page';

const routes: Routes = [
  {
    path: '',
    component: ThongtindiemdanhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongtindiemdanhPageRoutingModule {}
