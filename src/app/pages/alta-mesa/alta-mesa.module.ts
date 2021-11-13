import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaMesaPageRoutingModule } from './alta-mesa-routing.module';

import { AltaMesaPage } from './alta-mesa.page';
import { SpinnerComponent } from './../../componentes/spinner/spinner.component';
import { CamaraDeFotosComponent } from './../../componentes/camara-de-fotos/camara-de-fotos.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaMesaPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [AltaMesaPage, SpinnerComponent, CamaraDeFotosComponent]
})
export class AltaMesaPageModule {}
