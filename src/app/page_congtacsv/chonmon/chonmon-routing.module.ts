import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChonmonPage } from './chonmon.page';

const routes: Routes = [
  {
    path: '',
    component: ChonmonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChonmonPageRoutingModule {}
