import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlAsistenciaPageRoutingModule } from './control-asistencia-routing.module';

import { ControlAsistenciaPage } from './control-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlAsistenciaPageRoutingModule
  ],
  declarations: [ControlAsistenciaPage]
})
export class ControlAsistenciaPageModule {}
