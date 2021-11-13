import { ListaOrdersPage } from './../pages/lista-orders/lista-orders.page';
import { HomePage } from './../pages/home/home.page';
import { ListadoClientesPage } from './../pages/listado-clientes/listado-clientes.page';
import { AltaMesaPage } from './../pages/alta-mesa/alta-mesa.page';
import { SpinnerComponent } from './../componentes/spinner/spinner.component';
import { ScannerDNIComponent } from './../componentes/scanner-dni/scanner-dni.component';
import { CamaraDeFotosComponent } from './../componentes/camara-de-fotos/camara-de-fotos.component';
import { AltaEmpleadoComponent } from './../componentes/alta-empleado/alta-empleado.component';
import { LoginPage } from '../pages/login/login.page';
import { ListaEsperaMesaPage } from '../pages/lista-espera-mesa/lista-espera-mesa.page';
import { AltaClientePage } from '../pages/alta-cliente/alta-cliente.page';
import { AltaProductoPage } from '../pages/alta-producto/alta-producto.page';
import { MenuPage } from '../pages/menu/menu.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatPage } from '../pages/chat/chat.page';
import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { FechaPipe } from '../pipes/fecha.pipe';
import { PagarPage } from '../pages/pagar/pagar.page';
import { GamePollPayPage } from '../pages/game-poll-pay/game-poll-pay.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    NgxQRCodeModule,
  ],
  declarations: [
    FolderPage,
    LoginPage,
    AltaEmpleadoComponent,
    AltaClientePage,
    CamaraDeFotosComponent,
    ScannerDNIComponent,
    SpinnerComponent,
    AltaMesaPage,
    ListadoClientesPage,
    AltaProductoPage,
    HomePage,
    ListaEsperaMesaPage,
    MenuPage,
    ChatPage,
    FechaPipe,
    ListaOrdersPage,
    PagarPage,
    GamePollPayPage
  ],
})
export class FolderPageModule {}
