import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThongtinlopPageRoutingModule } from './thongtinlop-routing.module';

import { ThongtinlopPage } from './thongtinlop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThongtinlopPageRoutingModule
  ],
  declarations: [ThongtinlopPage]
})
export class ThongtinlopPageModule {}
