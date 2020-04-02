import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongtinsvPage } from './thongtinsv.page';

const routes: Routes = [
  {
    path: '',
    component: ThongtinsvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongtinsvPageRoutingModule {}
