import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhangiogiangPageRoutingModule } from './phangiogiang-routing.module';

import { PhangiogiangPage } from './phangiogiang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhangiogiangPageRoutingModule
  ],
  declarations: [PhangiogiangPage]
})
export class PhangiogiangPageModule {}
