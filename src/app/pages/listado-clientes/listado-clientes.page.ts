import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '../../services/firebase-auth';
import Swal from 'sweetalert2';
import {MailService} from '../../services/mail.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.page.html',
  styleUrls: ['./listado-clientes.page.scss'],
})
export class ListadoClientesPage implements OnInit {

  constructor(public fireAuth: FirebaseAuth, private email: MailService) {}

  clientes =[];
  spinner = true;

  ngOnInit(): void {
    this.fireAuth.bringClientsUnapproved(FirebaseAuth.users, this.clientes);
    var counter = 0;
    let intervalId = setInterval(() => {
      this.spinner = false;
    }, 2000);

  }


  aceptar(cliente){
    cliente.aprobado = true;
    this.fireAuth.saveExistingEntity(FirebaseAuth.users, cliente, cliente.id).then(result => {
      this.email.enviarEmail("registro_aprobado", cliente.mail, cliente.nombre);
      this.presentSwal('aprobado');
    });

  }

  denegar(cliente){
    cliente.aprobado = false;
    this.fireAuth.saveExistingEntity(FirebaseAuth.users, cliente, cliente.id).then(result => {
      this.email.enviarEmail("registro_rechazado", cliente.mail, cliente.nombre);
      this.presentSwal('denegado');
    });  
  }

  
  presentSwal(stringWord){
		Swal.fire(
			{
			title: 'Cliente actualizado!',
			text: 'El cliente fue ' + stringWord,
			icon: 'success',
			}
		  );

		//this.router.navigate(['/tabs/tab2']);
	}
}
