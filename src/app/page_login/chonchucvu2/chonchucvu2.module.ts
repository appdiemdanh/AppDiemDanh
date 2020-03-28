import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Chonchucvu2PageRoutingModule } from './chonchucvu2-routing.module';

import { Chonchucvu2Page } from './chonchucvu2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Chonchucvu2PageRoutingModule
  ],
  declarations: [Chonchucvu2Page]
})
export class Chonchucvu2PageModule {}
