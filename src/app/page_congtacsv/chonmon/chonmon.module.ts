import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChonmonPageRoutingModule } from './chonmon-routing.module';

import { ChonmonPage } from './chonmon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChonmonPageRoutingModule
  ],
  declarations: [ChonmonPage]
})
export class ChonmonPageModule {}
