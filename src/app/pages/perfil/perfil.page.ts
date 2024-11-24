import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { ApiService } from 'src/app/services/api.service'; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: any;
  correo: string = ''
  nombre: string = ''
  apellido: string = ''
  carrera: string = ''

  constructor(private api: ApiService, private router: Router, private bd: BaseService) {}

  ngOnInit() {
    this.datos();

  }

  async datos() {
    let datos = await this.bd.mostrarUsuario();
    
    if (datos) {
      this.correo = datos.correo
      this.nombre = datos.nombre
      this.apellido = datos.apellido
      this.carrera = datos.carrera
    }
  }

  navegarCambiarContrasena(){
    this.router.navigate(['cambiar-datos']);
  }
}

