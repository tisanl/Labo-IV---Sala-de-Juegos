import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  nombre: string = 'Santiago';
  apellido: string = 'Lopez';
  materia: string = 'Laboratorio IV';
  division: string = 'A342';
  descripcion: string = 'Descripcion del juego';
  imagen: File | null = null;
  imagenUrl: string = 'assets/images/mi-imagen.png';
}
