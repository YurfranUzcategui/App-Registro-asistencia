import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pantalla-carga',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'crear-usuario',
    loadChildren: () => import('./pages/crear-usuario/crear-usuario.module').then( m => m.CrearUsuarioPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'cambiar-datos',
    loadChildren: () => import('./pages/cambiar-datos/cambiar-datos.module').then( m => m.CambiarDatosPageModule)
  },
  {
    path: 'pantalla-carga',
    loadChildren: () => import('./pages/pantalla-carga/pantalla-carga.module').then( m => m.PantallaCargaPageModule)
  },
  {
    path: 'control-asistencia',
    loadChildren: () => import('./pages/control-asistencia/control-asistencia.module').then( m => m.ControlAsistenciaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
