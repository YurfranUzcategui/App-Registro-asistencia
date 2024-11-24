import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlAsistenciaPage } from './control-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: ControlAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlAsistenciaPageRoutingModule {}
