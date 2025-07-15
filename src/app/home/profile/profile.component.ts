import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Client {
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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  client: Client | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchClientData();
  }

  fetchClientData() {
    const login = localStorage.getItem('login');
    console.log(login);
    if (!login) {
      this.error = 'No login information found';
      this.isLoading = false;
      return;
    }

    // Get the client data directly using the login
    this.http.get<Client>(`http://localhost:5082/api/Client/byLogin/${login}`).subscribe({
      next: (data) => {
        this.client = data;
        this.isLoading = false;
        console.log('Client data:', data);
      },
      error: (err) => {
        this.error = err.status === 404 
          ? `Client with login ${login} not found` 
          : 'Failed to load client data';
        this.isLoading = false;
        console.error('Error:', err);
      }
    });
  }

  navigateToKycForm() {
    this.router.navigate(['/home/KycForm']);
  }
}