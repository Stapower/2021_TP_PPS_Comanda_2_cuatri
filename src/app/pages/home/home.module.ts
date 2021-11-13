import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SpinnerComponent } from './../../componentes/spinner/spinner.component';
import { ScannerDNIComponent } from './../../componentes/scanner-dni/scanner-dni.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, SpinnerComponent, ScannerDNIComponent]
})
export class HomePageModule {}
