import { Injectable } from '@angular/core';

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConexionSupabaseService {
  private supabaseClient: SupabaseClient | null = null;

  constructor() {
    this.supabaseClient = createClient(environment.apiUrl, environment.publicAnonKey);
  }

  get cliente(): SupabaseClient {
    if (!this.supabaseClient) {
      throw new Error('SupabaseClient no fue inicializado correctamente');
    }
    return this.supabaseClient;
  }
}
