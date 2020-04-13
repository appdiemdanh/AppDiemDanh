import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThoikhoabieuPage } from './thoikhoabieu.page';

const routes: Routes = [
  {
    path: '',
    component: ThoikhoabieuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThoikhoabieuPageRoutingModule {}
