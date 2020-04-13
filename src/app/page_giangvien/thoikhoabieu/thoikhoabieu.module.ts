import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThoikhoabieuPageRoutingModule } from './thoikhoabieu-routing.module';

import { ThoikhoabieuPage } from './thoikhoabieu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThoikhoabieuPageRoutingModule
  ],
  declarations: [ThoikhoabieuPage]
})
export class ThoikhoabieuPageModule {}
