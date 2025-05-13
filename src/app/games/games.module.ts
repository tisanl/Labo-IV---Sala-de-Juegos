import { NgModule } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GamesRoutingModule } from './games-routing.module';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MenuComponent } from './menu/menu.component';
import { ModalFinJuegoComponent } from './modal-fin-juego/modal-fin-juego.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';


@NgModule({
  declarations: [
    MenuComponent,
    AhorcadoComponent,
    ModalFinJuegoComponent,
    MayorMenorComponent,
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    NgbModule,
    FormsModule,
    NgClass,
    NgFor,
    NgIf,
  ]
})
export class GamesModule { }
