import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Reclamation {
  id: number;
  clientId: number;
  description: string;
  etat: number;
  dateReclamation: string;
  client: {
    nom: string;
    prenom: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = `${environment.apiUrl}/Reclamation`;

  constructor(private http: HttpClient) { }

  getReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiUrl);
  }

  updateStatus(id: number, etat: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/etat`, etat, {
      headers: {
        'Content-Type': 'application/json-patch+json'
      }
    });
  }
} 