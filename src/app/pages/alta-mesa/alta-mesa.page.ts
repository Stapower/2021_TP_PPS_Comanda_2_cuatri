import { QrCodeCallerService } from "./../../services/qr-code-caller.service";
import { Component, OnInit } from "@angular/core";
import { FirebaseAuth } from "../../services/firebase-auth";
import { TipoDeMesa } from "../../componentes/TipoDeMesa/TipoDeMesa";
import Swal from "sweetalert2";
import { QrcodeComponent, NgxQRCodeModule } from "@techiediaries/ngx-qrcode";

@Component({
	selector: "app-alta-mesa",
	templateUrl: "./alta-mesa.page.html",
	styleUrls: ["./alta-mesa.page.scss"],
})
export class AltaMesaPage implements OnInit {
	constructor(
		public fireAuth: FirebaseAuth,
		public qrCodeModule: QrcodeComponent,
		public qrCodeCaller: QrCodeCallerService
	) { }

	Mensajes;

	//tipo: VIP, Standard, Acceso Especial

	elementType = "url";
	value = "";

	mesa = {
		numero: "",
		comensales: "",
		tipo: "",
		foto: "https://www.sillasmesas.es/blog/wp-content/uploads/2019/04/mesa-restaurante-medidas-recomendadas-1.jpg",
		qr: "",
		qrValue: "",
	};

	asignarFoto(url) {
		console.log("AsignarFotoUrl", url)
		this.mesa.foto = url;
	}

	roles=[];
	ngOnInit() {

		for (let rol in TipoDeMesa) {
			this.roles.push(rol);
		}
		
	 }

	spinner;
	createdCode;

	generarQr(){

	}
	Spinnear(){
		this.spinner = true;
	}
	
	registrar() {
		console.log("registrar");
		var isDataGood = true;
		isDataGood = this.validarCompleto();
		if (!isDataGood) {
			return;
		}

		console.log("Data estaba bien");

		this.spinner = true;

		this.mesa.qrValue = "Mesa " + this.mesa.numero;

		//this.mesa.qr =
		this.qrCodeCaller.generateBeautifulQrCode(this.mesa.qrValue).subscribe(
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

		console.log("fuera de subscriber");

		//data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAXNSR0IArs4c6QAABKhJREFUeF7tndFy2zAMBOv//2h3pm9SOtm5HiizzOaVIgncAiAkW87r/X6/f/l3jAIvgR7D8o8jAj2Lp0AP4ylQgZ6mwGH+eIYK9DAFDnPHDBXoYQoc5o4ZKtDDFDjMHTNUoIcpcJg7ZqhAD1PgMHfqDH29Xo9Kcv/4lvanj3vv89P1p50ne2k/gd4CUqBmKCVNNG6GQkCRQJbcW7yRIFF4/uXidP3p69P1Un+n1x8/QykjVjucCkTX03jqz/366fUFGjZFnw5YCiCBCvQaI1Qy6D7xHnF027D7OGVQaj+t96WEt9/LFWj2YEWgZUlMAy4VfHUFMkNvb3YINAyJVDBavs0Q6kLJ3vS2wgwFogLt3h1bftuyOoKnM84MDZsWS+41A9OAJP2Oy1BymM5YM3SzDBVoGrLhpy1Pn6ECFei3MUBn3OqApQB9/NFfalB6hrXr03wCSvNpfHr95U0ROUTj0w7Tfk8H1LR/AgXC04KvDhiBCvSqQNoUpCXvfv30o0HKwE/7l+o1nqGpAen1Av1eMYEOPxhJA5QqULqeQAWaxsyz19OZVz5HedaZf9itztB/2HPpFIEeFrICFejSivH04nXJpYwghyie0vvE9LamfXKT+t/aR3oK9KYQBRAFAAku0PC2ohVMoOULv5bc6zfvSQ+qANuV3DRD0hK4OoPpTG33F+hNgVZQCjiBhq8uYISGr+gTIKoAFCD0rDbdH/2ffvuMNlzt4OoMIQCr9yd96zP00xGcCkj2kmA0Tk1Nay/tL9CyS6eKkwYQBYRA4R9HUcaQgAIdbloICEU8zf9xQEmQVlDqIml9AtLaTyW1tY/s/7L/6i6XHEoFpS4zFiCsGLT+tH20n0BvCqQBRQILNMyQacEECiHaCkTz064yPePSgCF7qQdo/RkvuSRYajAJlK5H9pHgq3uA1h+Blp+vUoAQIApYCiA8w9sut3UwnU+CocMCJYk+Oz4d8ekZSgFJGdfut7zkPo1XoFfFxx/OCzT7SokZuvmDgRRQej0lTJ2hVPLIgHSczqR0PToDqQlL/V9uf9vlpg61gi8XpHxyRf4tt1+gt6ZCoNkvOlME0/jyCBdo1tURMDrTCCg1GU8fEekZTP6RfuNNUWuQQDf/vVyKKBqnjEsDwAwFxVPBCWAKKL1eoCXQVMDVH2fRmZYGCF2fBnB7ZC0/QwWaIRVo+CjQDLXkXhSgDEorUhpglO//fcklAQkAnYHtmZ6uT8BoXKBQsgUK73tShKUCmqFXRc1QM/QWEeGXrlZnKJ2Z9CBkeny66SH9jstQgZICm9+2UEalXSatl46boeGPaJDAAqUiHTYR4XJfLidg6TjZk3bZacC015P9y89QMoDGU2AEhPaj+XRCkb0CDbtoAiLQsikiAWmcIj4dp/0oIH5chpJg7TgJPr0+rZcGFAUE7Ufj42cobdiOC/R7BQV60yfNIDO0TFEzdHGGlnycPqxAXXKH7XG5UgGBlgLuNl2guxEp7RFoKeBu0wW6G5HSHoGWAu42XaC7ESntEWgp4G7TBbobkdIegZYC7jZdoLsRKe0RaCngbtMFuhuR0h6BlgLuNl2guxEp7fkNVv5jDutdeTQAAAAASUVORK5CYII=
		/*this.fireAuth.saveNewEntity(FirebaseAuth.mesas, this.mesa).then(response => {
				this.spinner = false;
				this.value = this.mesa.qrValue;
				
				this.presentSwal();
			});*/
	}

	presentSwal() {
		Swal.fire({
			title: "Mesa Registrada!",
			text: "Será redirigido al listado.",
			icon: "success",
		});

		//this.router.navigate(['/tabs/tab2']);
	}

	validarCompleto() {
		if (this.mesa.numero == "") {
			this.MostarMensaje("Completar Numero de Mesa");
			return false;
		}
		if (this.mesa.comensales == "") {
			this.MostarMensaje("Completar Cantidad de Comensales");
			return false;
		}
		if (this.mesa.tipo == "") {
			this.MostarMensaje("Completar Tipo de Mesa");
			return false;
		}
		if (this.mesa.foto == "") {
			this.MostarMensaje("Completar Foto de Mesa");
			return false;
		}

		return true;
	}

	MostarMensaje(
		mensaje: string = "este es el mensaje",
		ganador: boolean = false
	) {
		this.Mensajes = mensaje;
		var x = document.getElementById("snackbar");
		if (ganador) {
			x.className = "show Ganador";
		} else {
			x.className = "show Perdedor";
		}
		var modelo = this;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
		console.info("objeto", x);
	}

	isImageLoading: boolean;
	imageToShow: any;


	createImageFromBlob(image: Blob) {
		let reader = new FileReader();
		console.log("createImageFromBlob");

//		this.imageToShow = reader.result;
		console.log("imageToShow", this.imageToShow);

		this.fireAuth.addImageAndReturnURL(image, this.mesa.qrValue, false).then(response =>{
			console.log("addImageAndReturnURL", response);
			this.mesa.qr = response;

			this.fireAuth.saveNewEntity(FirebaseAuth.mesas, this.mesa).then(response => {
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
				console.log(this.mesa.qr);

			},
			false
		);

		if (image) {
			reader.readAsDataURL(image);
		}
	}
}
