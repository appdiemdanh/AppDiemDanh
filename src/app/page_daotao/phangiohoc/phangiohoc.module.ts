import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhangiohocPageRoutingModule } from './phangiohoc-routing.module';

import { PhangiohocPage } from './phangiohoc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhangiohocPageRoutingModule
  ],
  declarations: [PhangiohocPage]
})
export class PhangiohocPageModule {}
