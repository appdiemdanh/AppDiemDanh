import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChitietVanghocPage } from './chitiet-vanghoc.page';

const routes: Routes = [
  {
    path: '',
    component: ChitietVanghocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChitietVanghocPageRoutingModule {}
