import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XacthucEmailPageRoutingModule } from './xacthuc-email-routing.module';

import { XacthucEmailPage } from './xacthuc-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XacthucEmailPageRoutingModule
  ],
  declarations: [XacthucEmailPage]
})
export class XacthucEmailPageModule {}
