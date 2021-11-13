import { SpinnerComponent } from './../../componentes/spinner/spinner.component';
import { ScannerDNIComponent } from './../../componentes/scanner-dni/scanner-dni.component';
import { CamaraDeFotosComponent } from './../../componentes/camara-de-fotos/camara-de-fotos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaClientePageRoutingModule } from './alta-cliente-routing.module';

import { AltaClientePage } from './alta-cliente.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaClientePageRoutingModule
  ],
  declarations: [AltaClientePage, CamaraDeFotosComponent, ScannerDNIComponent, SpinnerComponent]
})
export class AltaClientePageModule {}
