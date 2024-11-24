import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_correo: string = '';  
  mdl_contrasena: string = '';  
  
  db_correo: string = '';
  db_nombre: string = '';
  db_apellido: string = '';
  db_carrera: string = '';

  constructor(private api: ApiService, private router: Router, private db:BaseService) { }

  ngOnInit() {}

  async guardarUsuario() {
    await this.db.almacenarUsuario(this.db_correo, this.db_nombre, this.db_apellido, this.db_carrera);
  }

  async iniciarSesion() {
    try {
      let datos = this.api.ingresar(this.mdl_correo, this.mdl_contrasena);
      let respuesta: any = await lastValueFrom(datos);
      let json_texto = JSON.stringify(respuesta)
      let json = JSON.parse(json_texto)

      if(json.status == 'success'){
        this.db_correo = json.usuario.correo
        this.db_nombre = json.usuario.nombre
        this.db_apellido = json.usuario.apellido
        this.db_carrera = json.usuario.carrera
        this.isToastOpen = true
        console.log('YRUZ: Login exitoso:', respuesta.message);
        this.mensaje = 'Ingreso exitoso'
        await this.guardarUsuario()
        setTimeout(() => {
          this.router.navigate(['principal']);
        }, 2000);
      } else if(json.status == 'error') {
        this.isToastOpen = true
        this.mensaje = json.message
        console.log('YRUZ: Error al iniciar sesión:', respuesta.message || 'Credenciales incorrectas');
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  navegarCrearUsuario(){
    this.router.navigate(['crear-usuario'])
  }

  isToastOpen = false
  mensaje : string = ''

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }


}

