import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
  id: number;
  indicateurTel?: string;
  adresse?: string;
  adresseComplete?: string;
  adresseLieuTravail?: string;
  agence?: string;
  agenceResidence?: string;
  cin?: string;
  civilite?: string;
  clientautrebanque?: string;
  codepostal?: string;
  confidenceRate?: string;
  dateRDV?: string;
  datecin?: string;
  dateNaissance?: string;
  deviseCompteReserved?: string;
  environment?: string;
  etatcivil?: string;
  gouvernorat?: string;
  mailPrincipal?: string;
  nationalite?: string;
  nom?: string;
  nomMere?: string;
  nomPere?: string;
  pays?: string;
  paysRelations?: string;
  paysNaissance: string;
  prenom?: string;
  rcin?: string;
  referentiel?: string;
  resident?: string;
  secondenationalite?: string;
  selfie?: string;
  statutpro?: string;
  rib?: string;
  numeroTelephone?: string;
  autreNationalite?: string;
  prenommere?: string;
  prenompere?: string;
  datedelivrance?: string;
  motif?: string;
  objetrelation?: string;
  login?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientManagementService {
  private apiUrl = 'http://localhost:5082/api/Client';

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  getClientByLogin(login: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/byLogin/${login}`);
  }
} 