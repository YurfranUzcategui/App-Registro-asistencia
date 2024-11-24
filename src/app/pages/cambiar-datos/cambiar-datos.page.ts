import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-cambiar-datos',
  templateUrl: './cambiar-datos.page.html',
  styleUrls: ['./cambiar-datos.page.scss'],
})
export class CambiarDatosPage implements OnInit {

  usuario: any; // Aquí puedes cargar el usuario desde la API si es necesario

  mdl_correo : string = ''
  mdl_contrasena : string = ''
  mdl_carrera : string = ''


  constructor(private api: ApiService, private router: Router, private bd : BaseService) { }

  ngOnInit() {
  }

  async cambiarContrasena() {
    let datos = this.api.cambiarContrasena(this.mdl_correo,this.mdl_contrasena,this.mdl_carrera)
    let respuesta = await lastValueFrom(datos)
    let json_texto = JSON.stringify(respuesta)
    let json= JSON.parse(json_texto)

    if (json.status == 'success'){
      await this.actualizar()
      this.isToastOpen = true
      this.mensaje = json.message
      console.log('YRUZ: ', json.message)
      await this.bd.eliminarUsuario();
      this.router.navigate(['login'])

    }else if (json.status == "error") {
      this.isToastOpen = true
      this.mensaje = json.message
    }
  }

  async actualizar(){
    this.bd.actualizarUsuario(this.mdl_carrera,this.mdl_correo)
  }

  isToastOpen = false
  mensaje : string = ''

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

}
