import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChitietVanghocPageRoutingModule } from './chitiet-vanghoc-routing.module';

import { ChitietVanghocPage } from './chitiet-vanghoc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChitietVanghocPageRoutingModule
  ],
  declarations: [ChitietVanghocPage]
})
export class ChitietVanghocPageModule {}
