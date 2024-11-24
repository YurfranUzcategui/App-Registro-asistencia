import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-pantalla-carga',
  templateUrl: './pantalla-carga.page.html',
  styleUrls: ['./pantalla-carga.page.scss'],
})
export class PantallaCargaPage implements OnInit {

  constructor(private router : Router, private bd : BaseService) { }

  async ngOnInit() {
    await this.bd.abrirDB()
    await this.bd.crearTabla()
    setTimeout(async () => {
    let sesion = await this.bd.mostrarUsuario();
      if (sesion) {
        console.log('DABA: USUARIO OBTENIDO, DERIVANDO AL PRINCIPAL');
        this.router.navigate(['principal']);
      } else {
        console.log('DABA: NO HAY USUARIO, SE QUEDA EN EL LOGIN');
        this.router.navigate(['login'])
      }
    }, 2500)
  }

}
