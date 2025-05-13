import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuarioService } from './services/usuario/usuario.service';
import { Usuario } from './models/usuario/usuario';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, NgbModule, NgIf, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Sala de Juegos';

  ingresoUsuario: boolean = false;

  constructor(private router: Router, public usuario:UsuarioService) {  }

  ngOnInit(): void {  
      this.usuario.usuarioObservable.subscribe({
            next: (usuario: Usuario|null) => {
              if(usuario!==null) this.ingresoUsuario = true
            }
          });
    }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}

