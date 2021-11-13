import { AuthServiceService } from './../../services/auth-service.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { FirebaseAuth } from '../../services/firebase-auth';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  @Output() redirectTo = new EventEmitter();
  @Output() showError = new EventEmitter();


  constructor(public fireAuth: FirebaseAuth) { }

  ngOnInit() {
    this.fireAuth.bringEntity(FirebaseAuth.mesas, this.mesas);
  }

  mesas = [];
  spinner =false;

  async redirect(event){
    this.spinner = true;

    var user = AuthServiceService.usuario[0];

    if(event == 'Lista de Espera'){
      //se pone al cliente en Lista de Espera a mesa.
      user.waitingForTable = true;
      

      this.fireAuth.saveExistingEntity(FirebaseAuth.users, user, user.id).then(resp=>{
        AuthServiceService.usuario[0] = user;
        this.spinner = false;
        this.presentSwal("Usted fue agregado a la lista de Espera.");
      });
    }
    
	console.log("eventMesa",event.search('Mesa '));

    if(event.search('Mesa ') > -1){
      console.log('Inside');
      //se pone al cliente en Lista de Espera a mesa. 
      try{
			var table = await this.fireAuth.getEntityOneTime(FirebaseAuth.mesas, "qrValue", event);
			if(this.isThisYourTable(table)){
				this.redirectTo.emit("Asignado");
			}
			else{
				this.asignarClienteAMesa(user, table).then(good=>{
          this.redirectTo.emit("Asignado");
          this.spinner = false;
        }).catch(error =>{
          this.presentSwalError(error.message);
          this.spinner = false;
        });
				
			}
      }
      catch(error){
        this.presentSwalError(error.message);
        return;
      }
    }


    //this.redirectTo.emit(event);
  }

  isThisYourTable(table){
	if(table.assignedTo != null && table.assignedTo != undefined && table.assignedTo != '' && table.assignedTo.nombre == AuthServiceService.usuario[0].nombre){
		return true;
	}
	return false;
}

  async asignarClienteAMesa(user, table){
    console.log("user", user);
    if(user == null || user == undefined)
      throw new Error("Primero debe loggearse.");
    if(user.waitingForTable == null || user.waitingForTable == undefined || user.waitingForTable == "false"){
      throw new Error("El usuario no esta en Lista de Espera, escanear el QR para estarlo.");
    }

    if(this.isUserAlreadyAssigned()){
		throw new Error("Usted ya tiene una mesa asignada.");
    }

    //var table = await this.fireAuth.getEntityOneTime(FirebaseAuth.mesas, "qrValue", qrValue);

    if(table.assignedTo == null || table.assignedTo == undefined || table.assignedTo == ""){
      table.assignedTo = user;
    }
    else{
      throw new Error("Esta mesa ya esta siendo usada por el cliente " + table.assignedTo.nombre  );
    }

      user.waitingForTable = false;
      this.fireAuth.saveExistingEntity(FirebaseAuth.users, user, user.id);
      this.fireAuth.saveExistingEntity(FirebaseAuth.mesas, table, table.id);
      console.log("table", table);
  }

  isUserAlreadyAssigned(){
    var userHasTable = false;
    this.mesas.forEach(mesa => {
        if(!userHasTable)
        	if(mesa.assignedTo != null && mesa.assignedTo != undefined && mesa.assignedTo != '' && mesa.assignedTo.nombre == AuthServiceService.usuario[0].nombre)
				userHasTable = true;
    });
    
    return userHasTable;
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


  presentSwal(stringWord){
		Swal.fire(
			{
			title: 'Exito!',
			text: stringWord,
			icon: 'success',
			}
		);

		//this.router.navigate(['/tabs/tab2']);
	}


presentSwalError(stringWord){
		Swal.fire(
			{
			title: 'Error!',
			text: stringWord,
			icon: 'error',
			}
			);

		//this.router.navigate(['/tabs/tab2']);
	}

}
