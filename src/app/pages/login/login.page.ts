import { Roles } from './../../componentes/Roles/Roles';
import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '../../services/firebase-auth';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(public fireAuth: FirebaseAuth, private router: Router) {}

  public user;

  public mail;
  users = [];
  
  ngOnInit() {
    this.mail = 'admin@gmail.com';
    this.loggingIn = false;
    this.fireAuth.bringEntity('/users', this.users);
  }

  loggingIn = false;
  logIn(event) {
    console.info(this.user);
    localStorage.setItem('email', this.mail);
    this.loggingIn = true;

    if(this.selectedUser != null && this.selectedUser.rol == Roles.Cliente)
    {
      if(this.selectedUser.aprobado == undefined || this.selectedUser.aprobado == false){
          this.MostarMensaje("Cliente no aprobado.")
          this.loggingIn = false;
          return;
      }
    }
    var user = { email: this.mail, password: '123456' };
    this.fireAuth
      .login(user)
      .then((success) => {
        this.loggingIn = false;

        AuthServiceService.usuario.length = 0;
        AuthServiceService.usuario.push(this.user);
        //this.router.navigate(['/tabs/tab1']);

        /*
			var ionMenu = document.querySelector('ion-menu');
			console.log(ionMenu);
			ionMenu.classList.toggle('show-menu');
			*/

        //document.querySelector('ion-split-pane').classList.toggle('split-pane-visible');
        //document.querySelector('ion-router-outlet').classList.add('menu-content-open');
        document.querySelector('ion-menu').toggle();
        //classList.add('show-menu');
        //menu-content-open  -> ion-router-outlet
        //show-menu 		 -> ion-menu
        //

        //show-menu
        //ion-split-pane
        //ion-menu
        //this.router.navigate(['/component', this.user.email]);
        //localStorage.setItem("nombre", );
      })
      .catch((err) => {
        //this.router.navigate(['/tabs/tab1']);
      });
  }

  usuario(event) {
    console.log(event);
    //alert(event.detail.value);
    this.user.email = event;
  }

  selectedUser;
  clieckOnLogInUser(userInput) {
    console.log(userInput);
    this.mail = userInput.mail;
    this.user = userInput;
    this.selectedUser = userInput;

  }

  Mensajes;
  MostarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false) {
		this.Mensajes = mensaje;
		var x = document.getElementById("snackbar");
		if (ganador) {
			x.className = "show Ganador";
		} else {
			x.className = "show Perdedor";
		}
		var modelo = this;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
		console.info("objeto", x);
	}
}
