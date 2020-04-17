import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LichsudiemdanhPage } from './lichsudiemdanh.page';

const routes: Routes = [
  {
    path: '',
    component: LichsudiemdanhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichsudiemdanhPageRoutingModule {}
