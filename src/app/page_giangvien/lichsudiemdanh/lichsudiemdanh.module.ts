import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LichsudiemdanhPageRoutingModule } from './lichsudiemdanh-routing.module';

import { LichsudiemdanhPage } from './lichsudiemdanh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LichsudiemdanhPageRoutingModule
  ],
  declarations: [LichsudiemdanhPage]
})
export class LichsudiemdanhPageModule {}
