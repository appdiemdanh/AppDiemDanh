import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThongtinGvPageRoutingModule } from './thongtin-gv-routing.module';

import { ThongtinGvPage } from './thongtin-gv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThongtinGvPageRoutingModule
  ],
  declarations: [ThongtinGvPage]
})
export class ThongtinGvPageModule {}
