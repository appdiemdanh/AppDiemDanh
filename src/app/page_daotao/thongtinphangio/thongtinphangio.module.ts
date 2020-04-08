import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThongtinphangioPageRoutingModule } from './thongtinphangio-routing.module';

import { ThongtinphangioPage } from './thongtinphangio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThongtinphangioPageRoutingModule
  ],
  declarations: [ThongtinphangioPage]
})
export class ThongtinphangioPageModule {}
