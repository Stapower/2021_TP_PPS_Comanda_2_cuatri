import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaOrdersPageRoutingModule } from './lista-orders-routing.module';

import { ListaOrdersPage } from './lista-orders.page';
import { SpinnerComponent } from './../../componentes/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaOrdersPageRoutingModule
  ],
  declarations: [ListaOrdersPage, SpinnerComponent]
})
export class ListaOrdersPageModule {}
