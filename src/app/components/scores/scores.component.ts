import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionSupabaseService } from '../../services/conexionSupabase/conexion-supabase.service';
import { NgFor } from '@angular/common';

export class Score {
  id?: string;
  created_at!: string;
  usuario_id!: string;
  usuario_nombre?: string;
  game?: string;
  points?: number;

  get fecha() {
    const normalizado = this.created_at.replace(/\.(\d{3})\d+/, '.$1');
    const fecha = new Date(normalizado);
    const dd = fecha.getDate().toString().padStart(2, '0');
    const mm = (fecha.getMonth()+1).toString().padStart(2, '0');
    const yyyy = fecha.getFullYear().toString();
    return `${dd}/${mm}/${yyyy}`;
  }
}

@Component({
  selector: 'app-scores',
  imports: [NgFor],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss'
})
export class ScoresComponent implements OnInit {
  public scoreAhorcado!: Array<Score>;
  public scoreMayorMenor!: Array<Score>;
  public scorePreguntados!: Array<Score>;

  constructor(private router: Router, private db: ConexionSupabaseService) { }

  ngOnInit(): void {
    this.getScores()
  }

  async getScores() {
    this.scoreAhorcado = await this.getScoreAhorcado()
    this.scoreMayorMenor = await this.getScoreMayorMenor()
    this.scorePreguntados = await this.getScorePreguntados()
  }

  async getScoreAhorcado() {
    const { data, error } = await this.db.cliente
      .from('scores')
      .select('*')
      .eq('game', 'ahorcado')
      .order('points', { ascending: false })
      .limit(5);

    if (error)
      throw new Error('Problema accediendo a la base de datos');

    return data.map(item =>Object.assign(new Score(), item));
  }

  async getScoreMayorMenor() {
    const { data, error } = await this.db.cliente
      .from('scores')
      .select('*')
      .eq('game', 'mayor-menor')
      .order('points', { ascending: false })
      .limit(5);

    if (error)
      throw new Error('Problema accediendo a la base de datos');

    return data.map(item =>Object.assign(new Score(), item));
  }

  async getScorePreguntados() {
    const { data, error } = await this.db.cliente
      .from('scores')
      .select('*')
      .eq('game', 'preguntados')
      .order('points', { ascending: false })
      .limit(5);

    if (error)
      throw new Error('Problema accediendo a la base de datos');

    return data.map(item =>Object.assign(new Score(), item));
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
