import { Roles } from './../../componentes/Roles/Roles';
import { OrderStatus } from './../../componentes/OrderStatus/OrderStatus';
import { ProductStatus } from './../../componentes/ProductStatus/ProductStatus';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseAuth } from '../../services/firebase-auth';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-orders',
  templateUrl: './lista-orders.page.html',
  styleUrls: ['./lista-orders.page.scss'],
})
export class ListaOrdersPage implements OnInit {

  constructor(public fireAuth: FirebaseAuth, private router: Router) {}

  usuario = AuthServiceService.usuario;

  orders = [];
  spinner = true;

  ngOnInit(): void {
    this.spinner = true;
    if(this.usuario[0].rol == Roles.Bartender || this.usuario[0].rol == Roles.Cocinero){
      this.fireAuth.bringEntityWithFilterKeyValue(FirebaseAuth.orders, "status",  OrderStatus.EnPreparacion, this.orders);
    }else if(this.usuario[0].rol == Roles.Mozo)
      	this.fireAuth.bringEntity(FirebaseAuth.orders, this.orders);
	else if(this.usuario[0].rol == Roles.Cliente)
		this.fireAuth.bringEntityWithFilterKeyValue(FirebaseAuth.orders, "table.assignedTo.mail" , this.usuario[0].mail, this.orders);
    
    var counter = 0;
    let intervalId = setInterval(() => {
      this.spinner = false;
    }, 2000);

  }

  ngAfterViewInit()	{
  }


  @Input() sourceType;
	@Output() linkFoto = new EventEmitter();

  aceptar(cliente){
    this.spinner = true;
    cliente.aprobado = true;
    cliente.status = OrderStatus.EnPreparacion;
    this.fireAuth.saveExistingEntity(FirebaseAuth.orders, cliente, cliente.id).then(result => {
      this.presentSwal('El Pedido fue enviado a cocina.');
    });

  }

  denegar(cliente){
    cliente.aprobado = false;
    this.spinner = true;
    cliente.status = OrderStatus.Rechazado;
    this.fireAuth.saveExistingEntity(FirebaseAuth.orders, cliente, cliente.id).then(result => {
      this.presentSwal('El Pedido fue Rechazado.');
    });  
  }

  empezarCoccion(order, product){
    this.spinner = true;
    product.status = ProductStatus.Cocinando;
    this.fireAuth.saveExistingEntity(FirebaseAuth.orders, order, order.id).then(result => {
      this.presentSwal('El Producto ' + product.nombre +  ' esta siendo cocinado.');
    });
  }

  prepararBebida(order, product){
	this.spinner = true;
    product.status = ProductStatus.Cocinando;
    this.fireAuth.saveExistingEntity(FirebaseAuth.orders, order, order.id).then(result => {
      this.presentSwal('El Producto ' + product.nombre +  ' esta siendo preparado.');
    });
  }


  terminarCoccion(order, product){
    this.spinner = true;
    product.status = ProductStatus.Listo;
    this.fireAuth.saveExistingEntity(FirebaseAuth.orders, order, order.id).then(result => {
      this.presentSwal('El Producto ' + product.nombre +  ' finalizó su cocción.');
    });
  }

  terminarBebida(order, product){
    this.spinner = true;
    product.status = ProductStatus.Listo;
    this.fireAuth.saveExistingEntity(FirebaseAuth.orders, order, order.id).then(result => {
      this.presentSwal('El Producto ' + product.nombre +  ' finalizó su perparación.');
    });
  }


  productoEnMesa(order, product){
	this.spinner = true;
    product.status = ProductStatus.Servido;

	if(this.orderServed(order))
		order.status = OrderStatus.Servido;

    this.fireAuth.saveExistingEntity(FirebaseAuth.orders, order, order.id).then(result => {
      this.presentSwal('Gracias por confirmar recepción, que disfrutes tu comida ' + order.assignedTo.name + '!');
    });

  }

  orderServed(order){
	var isOrderCompleted = false;
	order.products.forEach(product => {
			
			if(product.status == ProductStatus.Servido){
				//elements found
				isOrderCompleted = true;
			}
			else{
				//elements not found for bartender
				isOrderCompleted = false;
				return;
			}
	});

	return isOrderCompleted;
  }

  productoRetiradoPorMozo(order, product){
	this.spinner = true;

	product.status = ProductStatus.RetiradoPorMozo;

    this.fireAuth.saveExistingEntity(FirebaseAuth.orders, order, order.id).then(result => {
      this.presentSwal('El Producto ' + product.nombre +  ' será llevado a la mesa ' + order.table.numero);
    });

  }


  productMissing;
  bartenderProductsmissing;
  cocineroProductsmissing;

  isThereAnyProductForBartender(order){
	  var foundforBartender = false;

	  order.forEach(element => {
		if(element.status != OrderStatus.Finalizado){
		  element.products.forEach(product => {
			if(!foundforBartender){
				if(this.usuario[0].rol == 'Bartender'){
						if(product.category == 'bebida' && product.status == "" || product.status == undefined || product.status == ProductStatus.Cocinando){
							//elements found
							foundforBartender = true;
						}
						else{
							//elements not found for bartender
							foundforBartender = false;
						}
				}
			}
		  });
		}
	  }); 

	  return foundforBartender;
  }


  isThereAnyProductForCocinero(order){
	var foundforBartender = false;
	var foundforCocinero = false;

	

	order.forEach(element => {
		
		if(element.status != OrderStatus.Finalizado){
			element.products.forEach(product => {
				if(!foundforCocinero){
					if(this.usuario[0].rol == Roles.Cocinero){
						if(product.category == 'comida' && (product.status == "" || product.status == undefined || product.status == ProductStatus.Cocinando) ){
							//elements found
							foundforCocinero = true;
							return;
						}
						else{
							//elements not found for bartender
							foundforCocinero = false;
							this.cocineroProductsmissing = true;
						}
					}
				}
			});
		}
	}); 
	return foundforCocinero;
}


isThereAnyProductForMozo(order){
	var foundforMozo = false;

	order.forEach(element => {

		if(element.status != OrderStatus.Finalizado){
			element.products.forEach(product => {
				if(!foundforMozo){

					if(this.usuario[0].rol == Roles.Mozo){

						if(product.status == ProductStatus.Listo || element.status == OrderStatus.Nuevo){
							//elements found
							foundforMozo = true;
							return;
						}
						else{
							//elements not found for Mozo
							foundforMozo = false;
						}
					}
				}
			});
		}
	}); 
	return foundforMozo;
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


  pagarOrden(order){
	this.spinner = true;
	order.status = OrderStatus.SolicitudDePago;
    this.fireAuth.saveExistingEntity(FirebaseAuth.orders, order, order.id).then(result => {
		this.router.navigate(['/folder/Pagar']);
	});
  }


}
