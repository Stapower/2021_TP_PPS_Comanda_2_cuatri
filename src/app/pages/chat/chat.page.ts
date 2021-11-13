import { Roles } from './../../componentes/Roles/Roles';
import { AuthServiceService } from '../../services/auth-service.service';
import { Component } from '@angular/core';
import { FirebaseAuth } from '../../services/firebase-auth';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

  constructor(public fireAuth: FirebaseAuth) {}



  ngOnInit() {
    
    if(this.usuario[0].rol == Roles.Cliente){
    	this.fireAuth.bringEntityWithFilterKeyValue(FirebaseAuth.mesas, "assignedTo.mail", this.usuario[0].mail, this.mesaDeChat);
		this.selectedOrder = this.mesaDeChat;
	}
	if(this.usuario[0].rol == Roles.Mozo){
		this.fireAuth.bringEntity(FirebaseAuth.mesas, this.mesaDeChat);
		this.selectedOrder.length = 0;
	}
  }

  selectedOrder = [];

  seleccionDeChat(table){
	this.selectedOrder.push(table);
  }



  seccion = "";
  materia = "PPS";
  usuario = AuthServiceService.usuario;


  mesaDeChat = [];

  newMessage;



  submitMessage(event){
  
    if(event.key == "Enter"){
      this.saveMessage();
    }
  
  }

  saveMessage(){

    if(this.selectedOrder[0].chat == null || this.selectedOrder[0].chat == undefined || this.selectedOrder[0].chat.length <= 0)
      this.selectedOrder[0].chat = [];


    //TODO: Enviar Push Event al mozo.
    this.selectedOrder[0].chat.push( {"mail": this.usuario[0].mail, "time": new Date(), "message":this.newMessage} );

    this.fireAuth.saveExistingEntity(FirebaseAuth.mesas, this.selectedOrder[0], this.selectedOrder[0].id).then(response => { this.newMessage = "" }).catch(error => {});
    this.newMessage = "";
  }


bubbleStyle = "";
//[ngStyle]="{'font-style': styleExp}"
selectTeam(team){
  this.seccion = team;
  
  if(team == 'A')
    this.bubbleStyle = "{background: rgb(1, 22, 80)}";

  if(team == 'B')
    this.bubbleStyle = "{background: rgb(173, 35, 1)}";

}
  

}
