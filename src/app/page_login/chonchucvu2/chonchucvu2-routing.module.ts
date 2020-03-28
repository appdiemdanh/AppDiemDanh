import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Chonchucvu2Page } from './chonchucvu2.page';

const routes: Routes = [
  {
    path: '',
    component: Chonchucvu2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Chonchucvu2PageRoutingModule {}
