import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEsperaMesaPage } from './lista-espera-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEsperaMesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaEsperaMesaPageRoutingModule {}
