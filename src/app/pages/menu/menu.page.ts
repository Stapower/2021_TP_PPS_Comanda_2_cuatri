import { OrderStatus } from './../../componentes/OrderStatus/OrderStatus';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseAuth } from "../../services/firebase-auth";
import { AuthServiceService } from '../../services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
	selector: "app-menu",
	templateUrl: "./menu.page.html",
	styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {
	constructor(public fireAuth: FirebaseAuth) { }


	
	@Output() showError = new EventEmitter();
	@Output() redirect = new EventEmitter();

	productos = [];
	mesas = [];
	ngOnInit() {
		this.fireAuth.bringEntity(FirebaseAuth.productos, this.productos);
		this.fireAuth.bringEntity(FirebaseAuth.mesas, this.mesas);
	}

	moreQuantity(product) {
		if (product.quantity == null || product.quantity == undefined)
			product.quantity = 0;
		
		this.totalPrice += Number(product.price);



		product.quantity += 1;

		if(product.tiempo != undefined){
			this.newBiggerTime();
			//this.totalTime += Number(product.tiempo);
		}
	}

	lessQuantity(product) {
		if (product.quantity == null || product.quantity == undefined)
			product.quantity = 0;

		if (product.quantity > 0){
			product.quantity -= 1;
			this.totalPrice -= Number(product.price);
			this.newBiggerTime();
			//this.totalTime -= Number(product.tiempo);
		}
	}


	newBiggerTime(){

		var biggerTime = 0;
		this.productos.forEach((prod) => {
			console.log(prod);

			if (prod.quantity > 0) {
				if(prod.tiempo > biggerTime)
					biggerTime = prod.tiempo;
			}

		});

		this.totalTime = biggerTime;

	}

	user = AuthServiceService.usuario;
	totalPrice : number = 0;
	totalTime = 0;

	spinner = false;
	crearOrder() {

		this.spinner = true;
		var productsInOrder = [];
		console.log("user", this.user);

		this.productos.forEach((prod) => {
			console.log(prod);
			if (prod.quantity > 0) {
				productsInOrder.push(prod);
			}
		});

		if(productsInOrder.length > 0){

			var order = {
				products: productsInOrder,
				table: '',
				total: this.totalPrice,
				status: OrderStatus.Nuevo,
				descuento: 0,
				propina: 0
			};
			
			this.mesas.forEach(mesa =>{
				if(mesa.assignedTo != null && mesa.assignedTo != undefined && mesa.assignedTo != ''){
					if(mesa.assignedTo.mail == this.user[0].mail){
						order.table = mesa;
						return;
					}
				}
			});

			if(order.table == null || order.table == ''){
				this.spinner = false;
				this.presentSwalError("Debe tener una mesa asignada para crear una orden.");
				this.redirect.emit('Principal');
				return;
			}

			console.log(order);
			this.fireAuth.saveNewEntity(FirebaseAuth.orders, order).then(resp=>{
				this.spinner = false;
				this.presentSwal("Orden Creada exitosamente!");
				this.redirect.emit('Order');
			});

			
		}
		else{
			this.showError.emit("Debe elegir algún producto para crear la orden.");
		}

	}

	
	presentSwalError(message) {
		Swal.fire({
			title: "Error!",
			text: message,
			icon: "error",
		});
	}
	presentSwal(message) {
		Swal.fire({
			title: "Buen Provecho!",
			text: message,
			icon: "success",
		});

		//this.router.navigate(['/tabs/tab2']);
	}
}
