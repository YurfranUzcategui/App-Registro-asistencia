import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ruta: string = 'https://www.s2-studio.cl';
  
  correoUsuario: string = '';

  constructor(private http: HttpClient) { }

  crearUsuario(correo: string, contrasena: string, nombre: string, apellido: string, carrera: string) {
    let objeto: any = {
      correo: correo,
      contrasena: contrasena,
      nombre: nombre,
      apellido: apellido,
      carrera: carrera
    };

    return this.http.post(this.ruta + "/api_duoc/usuario/usuario_almacenar", objeto);
  }

  ingresar(correo: string, contrasena: string) {
    let objeto: any = {
      correo: correo,
      contrasena: contrasena
    };

    return this.http.post(this.ruta + "/api_duoc/usuario/usuario_login", objeto).pipe();
  }

  listarSedes(): Observable<any> {
    return this.http.get(`${this.ruta}/api_duoc/usuario/sedes_obtener`);
  }

  cambiarContrasena(correo : string, contrasena : string, carrera : string) {
    let objeto : any = {}
    objeto.correo = correo,
    objeto.contrasena = contrasena,
    objeto.carrera = carrera
    return this.http.patch(this.ruta + "/api_duoc/usuario/usuario_modificar", objeto).pipe();
  }


  listaAsignaturas() {
    return this.http.get(this.ruta + '/api_duoc/usuario/asistencia_obtener?correo=' + this.correoUsuario).pipe();
  }

  registrarAsistencia(sigla: string, correo: string, fecha: string) {
    let asistencia: any = {};

    try {
      asistencia.sigla = sigla;
      asistencia.correo = correo;
      asistencia.fecha = fecha;
    } catch (e) {
      console.log('YRUZ: ' + JSON.stringify(e));
    }

    return this.http.post(this.ruta + '/api_duoc/usuario/marcar_asistencia', asistencia).pipe();
  }








}
