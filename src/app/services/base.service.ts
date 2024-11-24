import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  dbInstancia: SQLiteObject | null = null;
  listaUsuario: any[] = []

  constructor(private sqlite: SQLite) { }

  
  async abrirDB() {
    try {
      this.dbInstancia = await this.sqlite.create({
        name: 'datos.db',
        location: 'default'
      });
      console.log("YRUZ: BASE DE DATOS OK");
    } catch (e) {
      console.log('YRUZ: PROBLEMA AL INICIAR LA BASE DE DATOS: ' + JSON.stringify(e));
    }
  }

  async crearTabla() {
    await this.abrirDB(); 

    try {
      await this.dbInstancia?.executeSql("CREATE TABLE IF NOT EXISTS USUARIO (CORREO VARCHAR(15), NOMBRE VARCHAR(30), APELLIDO VARCHAR(30), CARRERA VARCHAR(30))", []);
      console.log("YRUZ: TABLA CREADA OK");
    } catch(e) {
      console.log("YRUZ: " + JSON.stringify(e));
    }
  }

  async almacenarUsuario(correo: string, nombre: string, apellido: string, carrera: string) {
    await this.abrirDB();

    await this.dbInstancia?.executeSql("INSERT INTO USUARIO VALUES(?, ?, ?, ?)", [correo, nombre, apellido, carrera]);
    console.log('YRUZ: USUARIO ALMACENADA OK');
  }

  async mostrarUsuario() {
    await this.abrirDB();
    this.listaUsuario = [];

    try {
      let data = await this.dbInstancia?.executeSql('SELECT CORREO, NOMBRE, APELLIDO, CARRERA FROM USUARIO', []);

      if (data?.rows.length > 0) {
        return {
          correo: data.rows.item(0).CORREO,
          nombre: data.rows.item(0).NOMBRE,
          apellido: data.rows.item(0).APELLIDO,
          carrera: data.rows.item(0).CARRERA
        };
      }
      return null;
    } catch (e) {
      console.log('YRUZ: ' + JSON.stringify(e));
      return null;
    }
  }

  
  async eliminarUsuario() {
    await this.abrirDB();

    await this.dbInstancia?.executeSql('DELETE FROM USUARIO', [])
    console.log('YRUZ: USUARIO BORRADO')
  }

  async actualizarUsuario(carrera : string, correo : string){
    await this.abrirDB()
    this.dbInstancia?.executeSql("UPDATE USUARIO SET CARRERA = (?) WHERE CORREO = (?)", [carrera, correo])
  }

}
