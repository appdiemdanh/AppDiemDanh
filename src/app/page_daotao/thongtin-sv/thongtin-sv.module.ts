import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThongtinSvPageRoutingModule } from './thongtin-sv-routing.module';

import { ThongtinSvPage } from './thongtin-sv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThongtinSvPageRoutingModule
  ],
  declarations: [ThongtinSvPage]
})
export class ThongtinSvPageModule {}
