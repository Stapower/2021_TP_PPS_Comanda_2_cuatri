import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoClientesPageRoutingModule } from './listado-clientes-routing.module';

import { ListadoClientesPage } from './listado-clientes.page';
import { SpinnerComponent } from './../../componentes/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoClientesPageRoutingModule
  ],
  declarations: [ListadoClientesPage, SpinnerComponent]
})
export class ListadoClientesPageModule {}
