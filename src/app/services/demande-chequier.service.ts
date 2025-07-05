import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
  id: number;
  nom: string;
  prenom: string;
  cin: string;
  numeroTelephone: string;
  mailPrincipal: string;
}

export interface DemandeDeChequier {
  id: number;
  clientId: number;
  telephone: string;
  adresseEmail: string;
  nombreChequiersDemandes: number;
  dateDemande: string;
  etat: number;
  client: Client;
}

@Injectable({
  providedIn: 'root'
})
export class DemandeChequierService {
  private apiUrl = 'http://localhost:5082/api/DemandeDeChequier';

  constructor(private http: HttpClient) { }

  getAllDemandes(): Observable<DemandeDeChequier[]> {
    return this.http.get<DemandeDeChequier[]>(this.apiUrl);
  }

  getEtatText(etat: number): string {
    switch(etat) {
      case 0: return 'En Attente';
      case 1: return 'Approuvé';
      case 2: return 'Rejeté';
      default: return 'Inconnu';
    }
  }
} 