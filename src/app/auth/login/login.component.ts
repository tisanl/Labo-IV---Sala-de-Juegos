import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMsjErrorComponent } from '../../components/modal-msj-error/modal-msj-error.component';

import { createClient, User } from '@supabase/supabase-js'
import { environment } from '../../../environments/environment';

import { Usuario } from '../../models/usuario/usuario';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  usuario: Usuario = new Usuario();

  constructor(private router: Router, private modalService: NgbModal) { }

  async ingresar() {
    if (this.validarDatosIngreso()) {
      if (await this.emailYaRegistrado()) {
        await this.login()
        await this.getUsuarioId()
        await this.guardarLog()
        console.log(this.usuario)
        this.goTo('home');
      }
    }
    else this.mostrarError('Hay datos incorrectos.');
  }

  validarDatosIngreso() {
    if (this.email == null) return false
    if (this.password == null) return false
    return true
  }

  async login() {
    const { data, error } = await supabase.auth.signInWithPassword({ email: this.email, password: this.password, });

    if (error) {
      console.log(error.code)
      if (error.code === 'validation_failed')
        this.mostrarError('El mail no es valido.');
      else if (error.code === 'invalid_credentials')
        this.mostrarError('El mail o la contraseña son incorrectos.');
      else if (error.code === 'email_not_confirmed')
        this.mostrarError('El mail no fue validado.');
      else
        this.mostrarError('A ocurrido un error.\nIntente denuevo mas tarde');
      return false
    }
    else {
      this.usuario.id = data.user.id
      return true
    }
  }

  async getUsuarioId() {
    const { data, error } = await supabase.from('usuarios').select('*').eq('id', this.usuario.id).single();

    if (error) {
      this.mostrarError('Problema accediendo a la base de datos.\nIntente denuevo mas tarde');
      return false
    }
    else if (data === null) {
      this.mostrarError('No se encontro el usuario');
      return false
    }
    else {
      this.usuario = data
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

  async emailYaRegistrado() {
    const { data, error } = await supabase.from('usuarios').select('id').eq('email', this.email).maybeSingle();

    if (error) {
      this.mostrarError('Problema accediendo a la base de datos.\nIntente denuevo mas tarde');
      return false
    }
    else if (data === null) {
      this.mostrarError('El usuario no se encuentra registrado');
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

    modalRef.componentInstance.titulo = 'Error en el Login';
    modalRef.componentInstance.mensaje = mensaje;
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  autocompletar(){
    this.email = 'santi.lopez8846@gmail.com'
    this.password = '123456'
  }
}
