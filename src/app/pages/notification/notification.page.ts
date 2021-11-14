import {ApplicationRef, Component, OnInit} from '@angular/core';
import {PushService} from "../../services/push.service";
import {OSNotificationPayload} from "@ionic-native/onesignal";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  mensajes: OSNotificationPayload[] = [];
  userId = '';

  constructor( public pushService: PushService,
               private applicationRef: ApplicationRef ) {}

  ngOnInit() {

    this.pushService.pushListener.subscribe( noti => {
      this.mensajes.unshift( noti );
      this.applicationRef.tick();
    });
  }

  async ionViewWillEnter() {

    console.log('Will Enter - Cargar mensajes');
    this.userId = await this.pushService.getUserIdOneSignal();

    this.mensajes = await this.pushService.getMensajes();

  }

  async borrarMensajes() {
    await this.pushService.borrarMensajes();
    this.mensajes = [];

    console.log(this.mensajes);
  }

}
