import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  texto: string = '';
  lista_sedes: any[] = [];
  imagenPorDefecto: string = 'assets/icon/favicon.png';
  
  correo_logueado: string = '';
  textoQR: string = '';
  siglaQR: string = '';
  nombreQR: string = '';
  fechaClaseQR: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private bd: BaseService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    await this.inicializarDatos();
  }

  async inicializarDatos() {
    this.listarSedes();
    BarcodeScanner.installGoogleBarcodeScannerModule();
    await this.obtenerCorreoLogueado();
    this.api.correoUsuario = this.correo_logueado;
  }

  async listarSedes() {
    try {
      const datos = this.api.listarSedes();
      const respuesta = await lastValueFrom(datos);

      console.log('YRUZ: Respuesta original de la API:', respuesta);

      this.lista_sedes = respuesta[0].map((sede: any) => ({
        nombre: sede.NOMBRE,
        direccion: sede.DIRECCION,
        telefono: sede.TELEFONO,
        horario: sede.HORARIO_ATENCION,
        imagen: sede.IMAGEN
      }));

      console.log('YRUZ: Lista de sedes procesada:', this.lista_sedes);
    } catch (error) {
      console.error('YRUZ: Error al cargar sedes:', error);
      this.lista_sedes = [];
    }
  }

  onImageError(event: any) {
    console.log('Error al cargar imagen, usando imagen por defecto');
    event.target.src = this.imagenPorDefecto;
  }

  async cerrarSesion() {
    await this.bd.eliminarUsuario();
    this.router.navigate(['login']);
  }

  navegarPerfil() {
    this.router.navigate(['perfil']);
  }

  navegarAsistencia() {
    this.router.navigate(['control-asistencia']);
  }

  async obtenerCorreoLogueado() {
    const usuario = await this.bd.mostrarUsuario();
    if (usuario) {
      this.correo_logueado = usuario.correo;
      console.log('YRUZ: CORREO LOGUEADO', this.correo_logueado);
    }
  }

  async alertQR(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      backdropDismiss: true
    });

    await alert.present();

    setTimeout(() => alert.dismiss(), 1500);
  }

  async marcarAsistencia() {
    const datos = this.api.registrarAsistencia(this.siglaQR, this.correo_logueado, this.fechaClaseQR);
    const respuesta = await lastValueFrom(datos);
    const json = JSON.parse(JSON.stringify(respuesta));

    console.log('YRUZ status:', json.status);

    if (json.status === 'success') {
      await this.alertQR('Presente', `Presente para la clase de ${this.nombreQR} del día ${this.fechaClaseQR}`);
    } else if (json.status === 'error') {
      await this.alertQR('Error', json.message);
    }
  }

  async leerQRAsistencia() {
    this.resetearDatosQR();

    const loading = await this.loadingCtrl.create({
      message: 'Leyendo el código QR...',
      spinner: 'circles'
    });

    try {
      const resultado = await BarcodeScanner.scan();
      await loading.present();

      setTimeout(async () => {
        if (resultado.barcodes.length > 0) {
          this.procesarResultadoQR(resultado.barcodes[0].displayValue);
        }

        await loading.dismiss();
        await this.marcarAsistencia();
      }, 1000);
    } catch (error) {
      console.log('YRUZ ERROR-QR:', JSON.stringify(error));
    }
  }

  resetearDatosQR() {
    this.siglaQR = '';
    this.nombreQR = '';
    this.fechaClaseQR = '';
  }

  procesarResultadoQR(textoQR: string) {
    this.textoQR = textoQR;
    console.log('YRUZ QR:', this.textoQR);

    const textoSeparado = this.textoQR.split('|');
    console.log('YRUZ QR separado:', textoSeparado);

    this.siglaQR = textoSeparado[0];
    this.nombreQR = textoSeparado[1];
    this.fechaClaseQR = textoSeparado[2];

    console.log('YRUZ SIGLA:', this.siglaQR);
    console.log('YRUZ NOMBRE:', this.nombreQR);
    console.log('YRUZ FECHA:', this.fechaClaseQR);
  }
}
