import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { Routes, RouterModule } from '@angular/router';
import { DangkyPage } from '../dangky/dangky.page';
import { QuenmatkhauPage } from '../quenmatkhau/quenmatkhau.page';
import { DangkyPageModule } from '../dangky/dangky.module';
import { QuenmatkhauPageModule } from '../quenmatkhau/quenmatkhau.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
