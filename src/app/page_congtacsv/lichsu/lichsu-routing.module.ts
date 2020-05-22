import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LichsuPage } from './lichsu.page';

const routes: Routes = [
  {
    path: '',
    component: LichsuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichsuPageRoutingModule {}
