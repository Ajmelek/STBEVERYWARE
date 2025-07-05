import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DemandeDeCarteBancaire {
  id: number;
  clientId: number;
  telephone: string;
  adresseEmail: string;
  typeDeCarte: string;
  dateDemande: string;
  etat: number;
  client: {
    id: number;
    nom: string;
    prenom: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DemandeCarteBancaireService {
  private apiUrl = 'http://localhost:5082/api/DemandeDeCarteBancaire';

  constructor(private http: HttpClient) { }

  getAllDemandes(): Observable<DemandeDeCarteBancaire[]> {
    return this.http.get<DemandeDeCarteBancaire[]>(this.apiUrl);
  }

  updateStatus(id: number, etat: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/etat`, etat);
  }
} 