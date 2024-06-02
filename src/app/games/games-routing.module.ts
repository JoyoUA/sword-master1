import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games.component';
import { SwordMasterComponent } from './sword-masted/sword-masted.component';
import { GameMenuComponent } from '../shared/module/game-menu/game-menu.component';

const routes: Routes = [
  { path: 'sword-master', component: SwordMasterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GamesRoutingModule { }