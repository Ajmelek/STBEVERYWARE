import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface Client {
  id: number;
  nom: string;
  prenom: string;
  // ... other client fields
}

export interface WalletDemand {
  id: number;
  clientId: number;
  telephone: string;
  adresseMail: string;
  dateDemande: string;
  etat: number;
  client: Client;
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private apiUrl = `${environment.apiUrl}/DemandeWallet`;

  constructor(private http: HttpClient) { }

  getWalletDemands(): Observable<WalletDemand[]> {
    return this.http.get<WalletDemand[]>(this.apiUrl);
  }

  updateStatus(id: number, etat: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/etat`, { etat }, {
      headers: {
        'Content-Type': 'application/json-patch+json'
      }
    });
  }
} 