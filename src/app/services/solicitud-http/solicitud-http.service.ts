import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Baraja } from '../../games/mayor-menor/mayor-menor.component';

@Injectable({
  providedIn: 'root'
})
export class SolicitudHttpService {

  constructor(private http: HttpClient) { }

  getDeckCartas(deck_id: string, count: number) {
    return this.http.get<Baraja>(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/`, {
      params:{count:count}
    });
  }
}
