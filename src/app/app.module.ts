import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';

import { QrCodeCallerService } from './services/qr-code-caller.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import firebaseConfig from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from '@ionic-native/barcode-scanner/ngx';
import { File } from '@ionic-native/file/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QrcodeComponent, NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { LogOutComponent } from './componentes/log-out/log-out.component';
import { FechaPipe } from './pipes/fecha.pipe';


@NgModule({
  declarations: [AppComponent, LogOutComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    HttpClientModule    
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    File,
    PhotoLibrary,
    Camera,
    SplashScreen,
    QrcodeComponent,
    LogOutComponent,
    QrCodeCallerService,
    HttpClient
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
