import {Injectable, EventEmitter} from '@angular/core';
import {OneSignal, OSNotification, OSNotificationPayload} from '@ionic-native/onesignal/ngx';
import {Storage} from '@ionic/storage';


@Injectable({
    providedIn: 'root'
})
export class PushService {

    mensajes: OSNotificationPayload[] = [
        // {
        //   title: 'Titulo de la push',
        //   body: 'Este es el body de la push',
        //   date: new Date()
        // }
    ];

    userId: string;

    pushListener = new EventEmitter<OSNotificationPayload>();


    constructor(private oneSignal: OneSignal,
                private storage: Storage) {

        this.cargarMensajes();
    }

    async getMensajes() {
        await this.cargarMensajes();
        return [...this.mensajes];
    }

    async configuracionInicial(userId: string) {

        this.oneSignal.startInit('543f9b5d-712f-48c0-8257-f1245d324d7b', '343772762459');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe((noti) => {
            // do something when notification is received
            console.log('Notificación recibida', noti);
            this.notificacionRecibida(noti);
        });

        this.oneSignal.handleNotificationOpened().subscribe(async (noti) => {
            // do something when a notification is opened
            console.log('Notificación abierta', noti);
            await this.notificacionRecibida(noti.notification);
        });

        this.oneSignal.setExternalUserId(userId);

        // Obtener ID del suscriptor
        this.oneSignal.getIds().then(info => {
            this.userId = info.userId || 'userId';
            console.log(this.userId);
        });

        this.oneSignal.endInit();

    }

    async desuscripcion() {
        this.oneSignal.removeExternalUserId();
    }


    async getUserIdOneSignal() {
        console.log('Cargando userId');
        // Obtener ID del suscriptor
        const info = await this.oneSignal.getIds();
        this.userId = info.userId;
        return info.userId;
    }

    async notificacionRecibida(noti: OSNotification) {

        await this.cargarMensajes();
        const payload = noti.payload;
        const existePush = this.mensajes.find(mensaje => mensaje.notificationID === payload.notificationID);

        if (existePush) {
            return;
        }

        this.mensajes.unshift(payload);
        this.pushListener.emit(payload);
        await this.guardarMensajes();

    }

    guardarMensajes() {
        this.storage.set('mensajes', this.mensajes);
    }

    async cargarMensajes() {
        this.mensajes = await this.storage.get('mensajes') || [];
        return this.mensajes;

    }

    async borrarMensajes() {
        await this.storage.clear();
        this.mensajes = [];
        this.guardarMensajes();
    }

}
