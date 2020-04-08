import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhangiohocPage } from './phangiohoc.page';

const routes: Routes = [
  {
    path: '',
    component: PhangiohocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhangiohocPageRoutingModule {}
