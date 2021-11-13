import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamePollPayPage } from './game-poll-pay.page';

const routes: Routes = [
  {
    path: '',
    component: GamePollPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamePollPayPageRoutingModule {}
