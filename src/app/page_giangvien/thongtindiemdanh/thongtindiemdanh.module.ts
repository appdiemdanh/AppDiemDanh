import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThongtindiemdanhPageRoutingModule } from './thongtindiemdanh-routing.module';

import { ThongtindiemdanhPage } from './thongtindiemdanh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThongtindiemdanhPageRoutingModule
  ],
  declarations: [ThongtindiemdanhPage]
})
export class ThongtindiemdanhPageModule {}
