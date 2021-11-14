import {Injectable, EventEmitter} from '@angular/core';
import {OneSignal, OSNotification, OSNotificationPayload} from '@ionic-native/onesignal/ngx';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const headers = new HttpHeaders({
    'Authorization': "Basic NTE4ZDRjNzAtMWUwMy00Mjc4LWIyZmEtZjE5Mzg3MTg0NzNk"
});

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
                private storage: Storage,
                private http: HttpClient) {

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

    sendPushHttp(header: string,content:string, idUser:string ) {
        let data = {
            app_id:"543f9b5d-712f-48c0-8257-f1245d324d7b",
            include_external_user_ids:[idUser],
            data:{"user_id":"PostmanTest"},
            contents: {"en":"Default msj","es":content},
            headings: {"en":"Default title","es":header},
            big_picture:"https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/iconNotification.png?alt=media&token=20f57305-5e48-470a-bd3f-96bf171e17b3"
        };

        this.http.post<any>('https://onesignal.com/api/v1/notifications', data, {headers}).subscribe(dataRec=>{
            console.log(dataRec)
        });
    }

    logOut() {
        this.oneSignal.removeExternalUserId();
    }
}
