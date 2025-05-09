import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Client {
  nom: string;
  prenom: string;
  civilite: string;
  paysNaissance: string;
  autreNationalite: string;
  agence : string ;
  indicateurTel: string;
  codepostal : string ;
  codePostal : string ;
  Codepostal : string ;
  CodePostal : string ;
  dateNaissance : string ;
  mailPrincipal: string;
  adresse: string;
  nationalite: string;
  secondenationalite: string;
  nomMere: string;
  nomPere: string;
  prenompere: string;
  prenommere: string;
  etatCivil: string;
  cin: string;
  datecin: string;
  resident: string;
  numeroTelephone: string;
  datedelivrance : string; 
  objetrelation: string; 
  motif: string; 
  


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

  constructor(private http: HttpClient , private router: Router) {}

  ngOnInit(): void {
    this.fetchClientData();
  }

  fetchClientData() {
    this.http.get<Client>('http://localhost:5082/api/Client/First').subscribe({
      next: (data) => {
        this.client = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load client data';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
  navigateToKycForm(){
    this.router.navigate(['/home/KycForm']);
}
}