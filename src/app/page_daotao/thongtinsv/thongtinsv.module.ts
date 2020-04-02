import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThongtinsvPageRoutingModule } from './thongtinsv-routing.module';

import { ThongtinsvPage } from './thongtinsv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThongtinsvPageRoutingModule
  ],
  declarations: [ThongtinsvPage]
})
export class ThongtinsvPageModule {}
