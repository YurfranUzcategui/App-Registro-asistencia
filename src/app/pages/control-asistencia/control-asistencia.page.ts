import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BaseService } from 'src/app/services/base.service';
import { lastValueFrom } from 'rxjs';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-control-asistencia',
  templateUrl: './control-asistencia.page.html',
  styleUrls: ['./control-asistencia.page.scss'],
})
export class ControlAsistenciaPage implements OnInit {

  texto: string = '';
  correo_logueado: string = '';
  lista_asignaturas: any[] = [];
  TOTAL_CLASES: number = 5;

  textoQR: string = '';
  siglaQR: string = '';
  nombreQR: string = '';
  fechaClaseQR: string = '';

  constructor(private api: ApiService, private db: BaseService) {}

  async ngOnInit() {
    await this.obtenerCorreoLogueado();
    this.api.correoUsuario = this.correo_logueado;

    await this.listarAsistencia();
    BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  async obtenerCorreoLogueado() {
    const usuario = await this.db.mostrarUsuario();
    if (usuario) {
      this.correo_logueado = usuario.correo;
      console.log('YRUZ: CORREO LOGUEADO ' + this.correo_logueado);
    }
  }

  async listarAsistencia() {
    try {
      const datos = this.api.listaAsignaturas();
      const respuesta = await lastValueFrom(datos);
      const json = JSON.parse(JSON.stringify(respuesta));
      this.lista_asignaturas = [];

      json.forEach((grupo: any[]) => {
        grupo.forEach((asignaturaData: any) => {
          const asignatura = this.procesarAsignatura(asignaturaData);
          this.lista_asignaturas.push(asignatura);
        });
      });
    } catch (error) {
      console.error('YRUZ Error al listar asistencia:', error);
    }
  }

  procesarAsignatura(data: any) {
    const asignatura: any = {};
    asignatura.sigla = data.curso_sigla;
    asignatura.nombre = data.curso_nombre;
    asignatura.presente = data.presente;
    asignatura.ausente = data.ausente;

    
    asignatura.porcentajeAsistencia = this.calcularPorcentajeAsistencia(asignatura.presente);
    asignatura.status = this.determinarStatusAsignatura(asignatura.porcentajeAsistencia);
    asignatura.color = this.definirColorStatus(asignatura.status);

    console.log('YRUZ ASIGNATURA PROCESADA:', asignatura);
    return asignatura;
  }

  calcularPorcentajeAsistencia(presente: number): number {
    const decimalAsistencia = presente / this.TOTAL_CLASES;
    return decimalAsistencia * 100;
  }

  determinarStatusAsignatura(porcentaje: number): string {
    return porcentaje >= 70 ? 'Aprobado' : 'Reprobado por Inasistencia';
  }

  definirColorStatus(status: string): string {
    return status === 'Aprobado' ? 'success' : 'danger';
  }
}
