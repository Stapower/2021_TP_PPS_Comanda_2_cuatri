import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scanner-dni',
  templateUrl: './scanner-dni.component.html',
  styleUrls: ['./scanner-dni.component.scss'],
})
export class ScannerDNIComponent implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner) { }

  @Input() format;
  @Output() datosUsuario = new EventEmitter();

  ngOnInit() {}

  usuario = {
		"sexo": "",
		"nombre": "",
		"apellido": "",
		"dni": "",
	};

  barScanneroptions : BarcodeScannerOptions = {
		formats: "PDF_417" 
	}; //PDF_417
	escanear() {
    this.barScanneroptions.formats = this.format;
		this.barcodeScanner.scan(this.barScanneroptions).then(barcodeData => {
			console.log('Barcode data', barcodeData);
      var auxBarCode = barcodeData.text.split('@');
      
			this.usuario.nombre = auxBarCode[2];
			this.usuario.apellido = auxBarCode[1];
			this.usuario.dni = auxBarCode[4];
			this.usuario.sexo = auxBarCode[3];
      
      this.datosUsuario.emit(this.usuario);

		}).catch(err => {
			console.log('Error', err);
		});
  }


  escanearQr(){
    this.barScanneroptions.formats = this.format;
    //this.datosUsuario.emit('Alta Cliente');

    this.barcodeScanner.scan(this.barScanneroptions).then(barcodeData => {
			console.log('Barcode data', barcodeData);
      var auxBarCode = barcodeData.text;
      
      this.datosUsuario.emit(auxBarCode);

		}).catch(err => {
			console.log('Error', err);
		});
  }

  crearCodigo(){
    //format: 'QR_CODE' | 'DATA_MATRIX' | 'UPC_E' | 'UPC_A' | 'EAN_8' | 'EAN_13' | 'CODE_128' | 'CODE_39' | 'CODE_93' | 'CODABAR' | 'ITF' | 'RSS14' | 'RSS_EXPANDED' | 'PDF_417' | 'AZTEC' | 'MSI';

    this.barcodeScanner.encode("QR_CODE", "Tomas").then(barcodeData =>{
      alert(barcodeData);
    });

  }
  
}
