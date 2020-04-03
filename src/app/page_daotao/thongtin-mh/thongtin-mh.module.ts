import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThongtinMhPageRoutingModule } from './thongtin-mh-routing.module';

import { ThongtinMhPage } from './thongtin-mh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThongtinMhPageRoutingModule
  ],
  declarations: [ThongtinMhPage]
})
export class ThongtinMhPageModule {}
