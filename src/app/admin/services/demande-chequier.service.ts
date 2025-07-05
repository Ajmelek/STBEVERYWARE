import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemandeDeChequier } from '../models/demande-chequier.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeChequierService {
  private apiUrl = 'http://localhost:5082/api/DemandeDeChequier';

  constructor(private http: HttpClient) { }

  getDemandes(): Observable<DemandeDeChequier[]> {
    return this.http.get<DemandeDeChequier[]>(this.apiUrl);
  }

  updateStatus(id: number, etat: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/etat`, etat);
  }
} 