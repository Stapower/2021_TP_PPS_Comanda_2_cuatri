import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseAuth } from '../../services/firebase-auth';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lista-espera-mesa',
  templateUrl: './lista-espera-mesa.page.html',
  styleUrls: ['./lista-espera-mesa.page.scss'],
})
export class ListaEsperaMesaPage implements OnInit {

  constructor(public fireAuth: FirebaseAuth) {}

  clientes =[];
  spinner = true;

  ngOnInit(): void {
    this.fireAuth.bringEntityWithFilterKeyValue(FirebaseAuth.users, "waitingForTable", true, this.clientes);
    var counter = 0;
    let intervalId = setInterval(() => {
      this.spinner = false;
    }, 2000);

  }

  ngAfterViewInit()	{
    console.log("Lista de Espera ngAfterViewInit");
  }


  @Input() sourceType;
	@Output() linkFoto = new EventEmitter();

  aceptar(cliente){
    cliente.aprobado = true;
    this.fireAuth.saveExistingEntity(FirebaseAuth.users, cliente, cliente.id).then(result => {
      this.presentSwal('aprobado');
    });

  }

  denegar(cliente){
    cliente.aprobado = false;
    this.fireAuth.saveExistingEntity(FirebaseAuth.users, cliente, cliente.id).then(result => {
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
