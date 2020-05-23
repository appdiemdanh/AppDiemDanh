import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChonchucvuPageRoutingModule } from './chonchucvu-routing.module';

import { ChonchucvuPage } from './chonchucvu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChonchucvuPageRoutingModule
  ],
  declarations: [ChonchucvuPage]
})
export class ChonchucvuPageModule {}
