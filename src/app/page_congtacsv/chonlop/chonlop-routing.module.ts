import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChonlopPage } from './chonlop.page';

const routes: Routes = [
  {
    path: '',
    component: ChonlopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChonlopPageRoutingModule {}
