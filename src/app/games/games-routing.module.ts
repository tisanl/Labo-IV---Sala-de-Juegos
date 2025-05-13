import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MenuComponent } from './menu/menu.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';


const routes: Routes = [
    { path: '', redirectTo: 'menu', pathMatch: "full" },
    { path: 'menu', component: MenuComponent },
    { path: 'ahorcado', component: AhorcadoComponent },
    { path: 'mayor-menor', component: MayorMenorComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
