import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario';

import { BehaviorSubject, Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario = new BehaviorSubject<Usuario|null>(null)
  private observable = this.usuario.asObservable();

  constructor() { }

  get usuarioObservable(): Observable<Usuario|null> {
    return this.observable
  }

  get data(): Usuario|null {
    return this.usuario.getValue();
  }

  setUsuario(data:Usuario){
    this.usuario.next(data)
  }
}
