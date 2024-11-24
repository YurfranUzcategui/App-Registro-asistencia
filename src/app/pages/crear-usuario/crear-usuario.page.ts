import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

// Definimos la interfaz para el tipo de respuesta de la API
interface ApiResponse {
  status: string;
  message: string;
}

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  mdl_correo: string = '';
  mdl_contrasena: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';
  mdl_carrera: string = '';

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {}

  async almacenarUsuario() {
    try {
      let datos = this.api.crearUsuario(
                      this.mdl_correo, this.mdl_contrasena, 
                      this.mdl_nombre, this.mdl_apellido,
                      this.mdl_carrera
                  );
      let respuesta: any = await lastValueFrom(datos);
      let json_texto = JSON.stringify(respuesta)
      let json = JSON.parse(json_texto)
  
      if (json.status === 'success') {
        this.isToastOpen = true;
        this.mensaje = 'Usuario Creado correctamente'
        setTimeout(() => {
          this.router.navigate(['login'])
          this.mdl_correo = ''
          this.mdl_contrasena = ''
          this.mdl_nombre = ''
          this.mdl_apellido = ''
          this.mdl_carrera = ''
      }, 2000);
      } else if (json.status == 'error'){
        this.isToastOpen = true
        this.mensaje = json.message
      }
    } catch (error) {
      console.error('Error en la creación de usuario:', error);
    }
  }

  isToastOpen = false
  mensaje : string = ''

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }



}
