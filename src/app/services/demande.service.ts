// src/app/services/demande.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost:5082/api/Demande'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  addDemande(demandeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddDemande`, demandeData);
  }
}