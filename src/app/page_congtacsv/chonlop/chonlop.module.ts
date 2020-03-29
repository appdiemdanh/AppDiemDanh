import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChonlopPageRoutingModule } from './chonlop-routing.module';

import { ChonlopPage } from './chonlop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChonlopPageRoutingModule
  ],
  declarations: [ChonlopPage]
})
export class ChonlopPageModule {}
