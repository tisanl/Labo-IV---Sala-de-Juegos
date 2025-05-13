import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFinJuegoComponent } from '../modal-fin-juego/modal-fin-juego.component';
import { Cronometro, CronometroService } from '../../services/cronometro/cronometro.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss',
  standalone: false,
})
export class AhorcadoComponent implements OnInit, OnDestroy {
  palabra!: string;
  listaLetrasMostradas!: string[];

  errores!: number;
  letrasProbadas!: string[];

  cronometroSubscription: Subscription | null = null;
  cronometro?: Cronometro;

  constructor(private router: Router, private modalService: NgbModal, private cronometroService: CronometroService) { }

  ngOnInit(): void {
    this.getPalabra();
    console.log(this.palabra);
    this.listaLetrasMostradas = Array(this.palabra.length).fill('_');
    this.errores = 0;
    this.letrasProbadas = [];
    this.cronometroService.start();
    this.cronometroSubscription = this.cronometroService.cronometro.subscribe(c => {
      this.cronometro = c;
    });

  }

  getPalabra() {
    const idx = Math.floor(Math.random() * this.animales.length);
    this.palabra = this.animales[idx].toUpperCase();
  }

  evaluarLetra(letra: string) {
    this.letrasProbadas.push(letra)

    if (this.palabra.includes(letra)) {
      this.palabra.split('').forEach((c, i) => {
        if (c === letra)
          this.listaLetrasMostradas[i] = letra;
      });

      if (!this.listaLetrasMostradas.includes('_')){
        this.mostrarModal('Victoria');
        this.cronometroService.stop();
      }
    }
    else {
      this.errores++;
      if (this.errores == 7){
        this.mostrarModal('Derrota\nLa palabra era: ' + this.palabra);
        this.cronometroService.stop();
      }
    }
  }

  mostrarModal(mensaje: string) {
    const modalRef = this.modalService.open(ModalFinJuegoComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'custom-modal-style'
    });

    modalRef.componentInstance.titulo = 'Fin del Juego';
    modalRef.componentInstance.mensaje = mensaje;

    modalRef.result
      .then((resultado) => {
        if (resultado == 'volverAJugar') this.ngOnInit()
        else if (resultado == 'volverAlMenu') this.goTo('games/menu')
      })
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnDestroy() {
    this.cronometroSubscription?.unsubscribe();
    this.cronometroService.stop();
  }

  animales = [
    "perro",
    "gato",
    "pajaro",
    "pez",
    "conejo",
    "raton",
    "rata",
    "hamster",
    "cobaya",
    "ardilla",
    "cerdo",
    "vaca",
    "oveja",
    "caballo",
    "cabra",
    "pollo",
    "gallo",
    "gallina",
    "pavo",
    "pato",
    "ganso",
    "cisne",
    "tortuga",
    "lagartija",
    "cocodrilo",
    "serpiente",
    "rana",
    "sapo",
    "tiburon",
    "delfin",
    "ballena",
    "mono",
    "gorila",
    "chimpance",
    "orangutan",
    "elefante",
    "jirafa",
    "leon",
    "tigre",
    "leopardo",
    "pantera",
    "oso",
    "panda",
    "zorro",
    "lobo",
    "conejo",
    "ciervo",
    "rinoceronte",
    "hipopotamo",
    "cebra",
    "cebra",
    "camello",
    "koala",
    "pinguino",
    "loro",
    "canguro",
    "cangrejo",
    "langosta",
    "pulpo",
    "araña",
    "escorpion",
    "mariposa",
    "abeja",
    "mosquito",
    "mosca",
    "hormiga",
    "saltamontes"
  ];

  abecedario = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
}
