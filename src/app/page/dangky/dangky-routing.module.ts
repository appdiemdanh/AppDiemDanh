import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DangkyPage } from './dangky.page';

const routes: Routes = [
  {
    path: '',
    component: DangkyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DangkyPageRoutingModule {}
