import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePollPayPageRoutingModule } from './game-poll-pay-routing.module';

import { GamePollPayPage } from './game-poll-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePollPayPageRoutingModule
  ],
  declarations: [GamePollPayPage]
})
export class GamePollPayPageModule {}
