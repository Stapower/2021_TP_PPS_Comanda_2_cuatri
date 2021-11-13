import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaOrdersPage } from './lista-orders.page';

const routes: Routes = [
  {
    path: '',
    component: ListaOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaOrdersPageRoutingModule {}
