import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhangiogiangPage } from './phangiogiang.page';

const routes: Routes = [
  {
    path: '',
    component: PhangiogiangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhangiogiangPageRoutingModule {}
