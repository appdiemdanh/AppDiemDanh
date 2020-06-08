import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThongtinGiangdayPageRoutingModule } from './thongtin-giangday-routing.module';

import { ThongtinGiangdayPage } from './thongtin-giangday.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThongtinGiangdayPageRoutingModule
  ],
  declarations: [ThongtinGiangdayPage]
})
export class ThongtinGiangdayPageModule {}
