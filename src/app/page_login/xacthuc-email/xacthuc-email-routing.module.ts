import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XacthucEmailPage } from './xacthuc-email.page';

const routes: Routes = [
  {
    path: '',
    component: XacthucEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XacthucEmailPageRoutingModule {}
