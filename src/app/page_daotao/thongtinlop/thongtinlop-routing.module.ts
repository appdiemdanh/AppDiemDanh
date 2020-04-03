import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongtinlopPage } from './thongtinlop.page';

const routes: Routes = [
  {
    path: '',
    component: ThongtinlopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongtinlopPageRoutingModule {}
