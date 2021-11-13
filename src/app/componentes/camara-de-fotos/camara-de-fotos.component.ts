import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FirebaseAuth } from '../../services/firebase-auth';

@Component({
	selector: 'app-camara-de-fotos',
	templateUrl: './camara-de-fotos.component.html',
	styleUrls: ['./camara-de-fotos.component.scss'],
})
export class CamaraDeFotosComponent implements OnInit {

	constructor(private camera: Camera, public fireAuth: FirebaseAuth) { }

	ngOnInit() { }


	@Input() sourceType;
	@Output() linkFoto = new EventEmitter();


	options: CameraOptions = {
		quality: 100,
		sourceType : this.camera.PictureSourceType.CAMERA,
		destinationType: this.camera.DestinationType.DATA_URL,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE
	};


	spinner = false;

	subirArchivo() {

		if(this.sourceType != null){
			//En caso de querer agarrar archivos del celular, pasar como parametro Input  Camera.PictureSourceType.PHOTOLIBRARY
			//sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
			this.options.sourceType = this.sourceType;
		}
		


		let random = Math.random().toString(36).substr(2, 9) + '.jpg';

		this.spinner = true;

		this.camera.getPicture(this.options).then((imageData) => {

			this.fireAuth.addImageAndReturnURL(imageData, random).then(response => {
				console.log("About to emit", response);
				this.linkFoto.emit(response);

				this.spinner = false;
			}).catch(error => { this.spinner = false; });


		}).then(result => { this.spinner = false; }).catch(error => { this.spinner = false; });

	}

}
