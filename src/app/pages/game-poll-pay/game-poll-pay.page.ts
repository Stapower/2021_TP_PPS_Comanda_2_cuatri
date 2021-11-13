import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-poll-pay',
  templateUrl: './game-poll-pay.page.html',
  styleUrls: ['./game-poll-pay.page.scss'],
})
export class GamePollPayPage implements OnInit {

  constructor() { }

  redirigir = '';
  ngOnInit() {
  }

  @Output() redirectTo = new EventEmitter();


  selectTipo(toPage){
    this.redirectTo.emit(toPage);
  }

}
