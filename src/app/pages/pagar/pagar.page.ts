import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FirebaseAuth } from '../../services/firebase-auth';
import Swal from 'sweetalert2';

import { Roles } from './../../componentes/Roles/Roles';
import { OrderStatus } from './../../componentes/OrderStatus/OrderStatus';
import { ProductStatus } from './../../componentes/ProductStatus/ProductStatus';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.page.html',
  styleUrls: ['./pagar.page.scss'],
})
export class PagarPage implements OnInit {

  constructor(public fireAuth: FirebaseAuth) { }
  usuario = AuthServiceService.usuario;


  spinner = false;
  orders = [];

  ngOnInit() {
    this.spinner = true;

    if(this.usuario[0].rol == Roles.Cliente){
		this.fireAuth.bringEntityWithFilterKeyValue(FirebaseAuth.orders, "table.assignedTo.mail" , this.usuario[0].mail, this.orders);
		this.selectedOrder = this.orders;
	}
    else if(this.usuario[0].rol == Roles.Mozo){
     	this.fireAuth.bringEntityWithFilterKeyValue(FirebaseAuth.orders, "status" , OrderStatus.SolicitudDePago, this.orders);
		this.selectedOrder.length = 0;
	}

    let intervalId = setInterval(() => {
      this.spinner = false;
    }, 2000);

  }

  calcularPropina(order){
    var total = Number(order.total);
    var descuento = Number(order.descuento);
    var propina = Number(order.propina);
    
    return (total - total * (descuento/100)) + (total * (propina/100));
  }

  confirmarPago(){

    this.spinner = true;
    this.selectedOrder[0].status = OrderStatus.Finalizado;
    var table = this.selectedOrder[0].table;
    table.assignedTo = '';
    table.chat = '';

    this.fireAuth.saveExistingEntity(FirebaseAuth.mesas, table, table.id);
    this.fireAuth.saveExistingEntity(FirebaseAuth.orders, this.selectedOrder[0], this.selectedOrder[0].id).then(resp =>{
        this.spinner = false;
        this.presentSwal("Pedido pago, Mesa liberada!");
    });
  
  }

    
  presentSwal(stringWord){
    this.spinner = false;
		Swal.fire(
			{
			title: 'Pedido Actualizado!',
			text: stringWord,
			icon: 'success',
			}
		  );

		//this.router.navigate(['/tabs/tab2']);
  }

  selectedOrder = [];
  seleccionDeMesa(order){
    this.selectedOrder.length = 0;
    this.selectedOrder.push(order);
  }



}
