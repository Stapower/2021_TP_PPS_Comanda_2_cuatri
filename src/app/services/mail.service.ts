import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import emailjs, {EmailJSResponseStatus} from 'emailjs-com';
import {init} from "emailjs-com";

init("user_NfgVJViuAVwtuDQdgVzED");

@Injectable({
    providedIn: 'root'
})
export class MailService {

    constructor(private toast: ToastController) {
    }

    enviarEmail(templateID: string, correo: string, nombre: string) {
        let templateParams = {
            correoDestinatario: correo,
            nombreDestinatario: nombre
        };
        emailjs.send("service_7and93f", templateID, templateParams)
            .then(res => {
                console.log("Correo enviado.", res.status, res.text);
                this.presentToast("Correo enviado Exitosamente!.")
            })
            .catch(error => {
                console.log("Error al enviar.", error);
                this.presentToast("Fallo envio de Correo.")
            });
    }

    async presentToast(message: string) {
        const toast = await this.toast.create({
            message: message,
            duration: 2000
        });
        await toast.present();
    }

}
