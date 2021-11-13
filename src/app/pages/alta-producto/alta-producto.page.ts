import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '../../services/firebase-auth';
import Swal from 'sweetalert2';
import { QrcodeComponent, NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { AlertController } from '@ionic/angular';
import { QrCodeCallerService } from 'src/app/services/qr-code-caller.service';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.page.html',
  styleUrls: ['./alta-producto.page.scss'],
})
export class AltaProductoPage implements OnInit {
  constructor(
    public fireAuth: FirebaseAuth,
    public qrCodeModule: QrcodeComponent,
    public alertCtrl: AlertController,
    public qrCodeCaller: QrCodeCallerService
  ) { }

  Mensajes;

  elementType = 'url';
  value = '';

  producto = {
    nombre: '',
    descripcion: '',
    valoracion: 1,
    fotos: [],
    qr: '',
    qrValue: '',
    category: 'comida',
    price: '',
    tiempo: ''

  };

  asignarFoto(url) {
    console.log('urll   ' + url);
    this.spinner = false;
    this.producto.fotos.push(url);
  }

  ngOnInit() { }

  spinner;
  createdCode;

  Spinnear(){
		this.spinner = true;
	}

  registrar() {
    console.log('registrar');
    var isDataGood = true;
    isDataGood = this.validarCompleto();
    if (!isDataGood) {
      return;
    }

    console.log('Data estaba bien');

    this.spinner = true;

    this.producto.qrValue = 'Producto ' + this.producto.nombre;

    this.qrCodeCaller.generateBeautifulQrCode(this.producto.qrValue).subscribe(
			(data) => {
				//this is SVG as plain text
				const blob = new Blob([data], { type: "image/svg+xml" });
				const url = URL.createObjectURL(blob);
				console.log("data", data);
				console.log("blob", blob.arrayBuffer());
				console.log("url", url);

				this.createImageFromBlob(blob);
			},
			(error) => {
				this.spinner = false;
				console.log(error);
			}
		);
  }

  presentSwal() {
    Swal.fire({
      title: 'Producto Registrado!',
      text: 'Será redirigido al listado.',
      icon: 'success',
    });

    //this.router.navigate(['/tabs/tab2']);
  }

  validarCompleto() {
    if (this.producto.nombre == '') {
      this.MostarMensaje('Completar el nombre del producto.');
      return false;
    }
    if (this.producto.descripcion == '') {
      this.MostarMensaje('Completar la descripcion del producto.');
      return false;
    }
    if (this.producto.fotos.length == 0) {
      this.MostarMensaje('Completar Foto del producto');
      return false;
    }

    return true;
  }

  MostarMensaje(
    mensaje: string = 'este es el mensaje',
    ganador: boolean = false
  ) {
    this.Mensajes = mensaje;
    var x = document.getElementById('snackbar');
    if (ganador) {
      x.className = 'show Ganador';
    } else {
      x.className = 'show Perdedor';
    }
    var modelo = this;
    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
    console.info('objeto', x);
  }

  valor: number = 1;
  estrellas: any[] = new Array(5);

  review(i) {
    this.valor = i + 1;
    console.log(this.valor);
    this.producto.valoracion = this.valor;
  }

  isImageLoading: boolean;
	imageToShow: any;


	createImageFromBlob(image: Blob) {
		let reader = new FileReader();
		console.log("createImageFromBlob");

//		this.imageToShow = reader.result;
		console.log("imageToShow", this.imageToShow);

		this.fireAuth.addImageAndReturnURL(image, this.producto.qrValue, false).then(response =>{
			console.log("addImageAndReturnURL", response);
			this.producto.qr = response;

			this.fireAuth.saveNewEntity(FirebaseAuth.productos, this.producto).then(response => {
				this.spinner = false;						
				this.presentSwal();
			});

		});


		reader.addEventListener(
			"load",
			() => {
				console.log("addEventListener");

				//////

				//download https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/pictures%2Fusers%2FMesa%20adssa?alt=media&token=fa8de282-ff33-41bc-834f-4fa83d45cb61

				console.log("this.mesa.qr");
				console.log(this.producto.qr);

			},
			false
		);

		if (image) {
			reader.readAsDataURL(image);
		}
	}



  isMen = false;
  isGirl = false;
  sexo(evento, sex) {
    this.producto.category = sex;
    if (sex == 'bebida') {
      this.isGirl = false;
      this.isMen = true;
    }
    if (sex == 'comida') {
      this.isMen = false;
      this.isGirl = true;
    }
  }

}
