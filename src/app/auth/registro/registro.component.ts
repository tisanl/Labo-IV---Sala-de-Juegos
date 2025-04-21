import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMsjErrorComponent } from '../../components/modal-msj-error/modal-msj-error.component';

import { createClient, User } from '@supabase/supabase-js'
import { environment } from '../../../environments/environment';

import { Usuario } from '../../models/usuario/usuario';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey)

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
  standalone: false
})
export class RegistroComponent {
  nombre!: string;
  apellido!: string;
  fecha_nacimiento!: Date;
  email: string = '';
  password: string = '';

  usuario: Usuario = new Usuario();

  constructor(private router: Router, private modalService: NgbModal) { }

  async registrarUsuario() {
    if (this.validarDatosRegistro()) {
      if (await this.emailNoRegistrado()) {
        const dataUser = await this.registrarAuth()
        if (dataUser) {
          await this.guardarDatosTablaUsuario(dataUser);
          await this.guardarLog()
          this.goTo('home');
        }
      }
    }
    else this.mostrarError('Hay datos incorrectos.');
  }

  validarDatosRegistro() {
    if (this.nombre != null) this.nombre = this.capitalizar(this.nombre);
    else return false

    if (this.apellido != null) this.apellido = this.capitalizar(this.apellido);
    else return false

    if (this.fecha_nacimiento == null) return false

    if (this.email == null) return false

    if (this.password == null) return false

    return true
  }

  async registrarAuth() {
    const { data, error } = await supabase.auth.signUp({ email: this.email, password: this.password, });

    if (error) {
      console.log(error.code)
      if (error.code === 'weak_password')
        this.mostrarError('La contraseña debe tener al menos 6 caracteres.');
      else if (error.code === 'validation_failed')
        this.mostrarError('El mail no es valido.');
      else if (error.code === 'over_email_send_rate_limit')
        this.mostrarError('Ha intentado muchas veces.\nIntente denuevo mas tarde');
      else
        this.mostrarError('A ocurrido un error.\nIntente denuevo mas tarde');
      return false
    }
    else {
      return data.user
    }
  }

  async guardarDatosTablaUsuario(user: User) {
    const { data, error } = await supabase.from('usuarios')
      .insert([{ id: user.id, nombre: this.nombre, apellido: this.apellido, email: this.email, fecha_nacimiento: this.fecha_nacimiento }]);

    if (error) {
      console.log(error)
      this.mostrarError('Problema accediendo a la base de datos.\nIntente denuevo mas tarde');
      return false
    }
    else {
      this.usuario.id = user.id
      this.usuario.nombre = this.nombre
      this.usuario.apellido = this.apellido
      this.usuario.fecha_nacimiento = this.fecha_nacimiento
      this.usuario.email = this.email
      return true
    }
  }

  async guardarLog() {
    const { data, error } = await supabase.from('log').insert([{ id_usuario: this.usuario.id }]);

    if (error) {
      this.mostrarError('Problema accediendo a la base de datos.\nIntente denuevo mas tarde');
      return false
    }
    else return true
  }

  async emailNoRegistrado() {
    const { data, error } = await supabase.from('usuarios').select('id').eq('email', this.email).maybeSingle();

    if (error) {
      this.mostrarError('Problema accediendo a la base de datos.\nIntente denuevo mas tarde');
      return false
    }
    else if (data !== null) {
      this.mostrarError('El usuario ya se encuentra registrado');
      return false
    }
    else return true
  }

  mostrarError(mensaje: string) {
    const modalRef = this.modalService.open(ModalMsjErrorComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'custom-modal-style'
    });

    modalRef.componentInstance.titulo = 'Error en el Registro';
    modalRef.componentInstance.mensaje = mensaje;
  }

  capitalizar(texto: string) {
    return texto[0].toUpperCase() + texto.slice(1).toLowerCase();
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}

