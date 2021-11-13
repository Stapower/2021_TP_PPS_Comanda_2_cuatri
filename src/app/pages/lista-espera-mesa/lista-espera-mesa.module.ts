import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEsperaMesaPageRoutingModule } from './lista-espera-mesa-routing.module';

import { ListaEsperaMesaPage } from './lista-espera-mesa.page';
import { SpinnerComponent } from './../../componentes/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEsperaMesaPageRoutingModule
  ],
  declarations: [ListaEsperaMesaPage, SpinnerComponent]
})
export class ListaEsperaMesaPageModule {}
