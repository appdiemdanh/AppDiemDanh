import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LichsuPageRoutingModule } from './lichsu-routing.module';

import { LichsuPage } from './lichsu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LichsuPageRoutingModule
  ],
  declarations: [LichsuPage]
})
export class LichsuPageModule {}
