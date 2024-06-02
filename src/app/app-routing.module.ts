import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameMenuComponent } from './shared/module/game-menu/game-menu.component';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';
import { AppRedirectComponent } from './app-redirect.component';

const routes: Routes = [
  { path: '', component: GameMenuComponent, pathMatch: 'full' },
  { path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesModule) },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
