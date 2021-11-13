import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaProductoPageRoutingModule } from './alta-producto-routing.module';

import { AltaProductoPage } from './alta-producto.page';
import { SpinnerComponent } from './../../componentes/spinner/spinner.component';
import { CamaraDeFotosComponent } from './../../componentes/camara-de-fotos/camara-de-fotos.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaProductoPageRoutingModule
  ],
  declarations: [AltaProductoPage, SpinnerComponent, CamaraDeFotosComponent]
})
export class AltaProductoPageModule {}
