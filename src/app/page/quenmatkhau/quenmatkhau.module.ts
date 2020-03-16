import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuenmatkhauPageRoutingModule } from './quenmatkhau-routing.module';

import { QuenmatkhauPage } from './quenmatkhau.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuenmatkhauPageRoutingModule
  ],
  declarations: [QuenmatkhauPage]
})
export class QuenmatkhauPageModule {}
