import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DangnhapPageRoutingModule } from './dangnhap-routing.module';

import { DangnhapPage } from './dangnhap.page';
//import { WelcomPage } from '../welcome/welcom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DangnhapPageRoutingModule
  ],
  declarations: [DangnhapPage]
})
export class DangnhapPageModule {}
