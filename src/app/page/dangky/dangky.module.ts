import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DangkyPageRoutingModule } from './dangky-routing.module';

import { DangkyPage } from './dangky.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DangkyPageRoutingModule
  ],
  declarations: [DangkyPage]
})
export class DangkyPageModule {}
