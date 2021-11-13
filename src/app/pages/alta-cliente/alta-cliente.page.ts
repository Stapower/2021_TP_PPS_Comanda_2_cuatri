import { Roles } from './../../componentes/Roles/Roles';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseAuth } from '../../services/firebase-auth';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../../services/auth-service.service';


@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.page.html',
  styleUrls: ['./alta-cliente.page.scss'],
})
export class AltaClientePage implements OnInit {

  constructor(public fireAuth: FirebaseAuth) { }

  Mensajes;

  usuarioLoggeado = AuthServiceService.usuario;
  @Output() redirect = new EventEmitter();

  usuario = {
    nombre:"",
    apellido: "",
    dni: "",
    foto: "https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/hayppyCustomer.png?alt=media&token=377b466a-1275-41e0-be2b-62f4435f7c9a",
    mail:"",
    rol: Roles.Cliente,
    aprobado: false
  };
  
  pass1 = '';
  pass2 = '';
  tipoDeLogin = '';


  selectTipo(tipoLogin){
    this.tipoDeLogin = tipoLogin;
  }

  asignarFoto(url){
    this.usuario.foto = url;
  }

  ngOnInit() {
  }

  datosDeScanner(user){
	this.usuario.nombre = user.nombre;
	this.usuario.apellido = user.apellido;
	this.usuario.dni = user.dni;
  }
  
  spinner;
  async registrar(){
    var isDataGood = true;
    if(this.tipoDeLogin == 'anon'){
      isDataGood = this.validarAnon();
      this.usuario.aprobado = true;
    }
    else{
      isDataGood = this.validarCompleto()
      this.usuario.aprobado = false;
    }

    if(!isDataGood){
      return;
    }

    this.spinner = true;

    if(this.tipoDeLogin != 'anon'){
      var user = {
        email : this.usuario.mail,
        password : this.pass1
      };

      await this.fireAuth.signIn(user);
    }else{
		this.usuario.mail="anonimo@gmail.com";
		AuthServiceService.usuario.length=0;
		AuthServiceService.usuario.push(this.usuario);
	}



    this.fireAuth.saveNewEntity(FirebaseAuth.users, this.usuario).then(response => {
      	this.spinner = false;

      	if(this.tipoDeLogin != 'anon'){
       		this.presentSwal("Cliente Creado, a la espera de aprobación.");
			this.redirect.emit("Log In");
		  }
	    else{
		  this.presentSwal("Cliente Creado, disfrute su estadía.");
    	}
    });

  }

  validarCompleto(){
    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(this.usuario.apellido == ''){
      this.MostarMensaje("Completar Apellido.");
      return false;
    }
    if(this.usuario.dni == ''){
      this.MostarMensaje("Completar DNI.");
      return false;
    }
    if(this.usuario.mail == ''){
      this.MostarMensaje("Completar E-mail.");
      return false;
    }
    if (!this.usuario.mail.match(EMAIL_REGEX)) {
			this.MostarMensaje("Formato de mail inválido.");
			return false;
		}
    if(this.pass1 == '' || this.pass1 == undefined){
      this.MostarMensaje("Completar Contraseña.");
			return false;
    }
    if(this.pass2 == ''){
      this.MostarMensaje("Repetir Contraseña.");
			return false;
    }
    if(this.pass2 != this.pass1){
      this.MostarMensaje("Las contraseñas deben coincidir.");
			return false;
    }

    return this.validarAnon();

  }

  validarAnon(){
    if(this.usuario.nombre == ''){
      this.MostarMensaje("Completar Nombre");
      return false;
    }
   
    if(this.usuario.foto == ''){
      this.MostarMensaje("Subir foto");
      return false;
    }

    return true;
  }

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


  presentSwal(stringWord){
    this.spinner = false;
		Swal.fire(
			{
			title: 'Cliente creado!',
			text: stringWord,
			icon: 'success',
			}
		  );

		//this.router.navigate(['/tabs/tab2']);
  }

}
