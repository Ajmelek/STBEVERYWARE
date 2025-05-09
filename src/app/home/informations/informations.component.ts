import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import SignaturePad from 'signature_pad';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // For standalone

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
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements AfterViewInit {
    client: Client | null = null;
    isLoading = true;
    error: string | null = null;

  @ViewChild('signaturePad', { static: false }) signaturePadElement!: ElementRef;
  signaturePad!: SignaturePad;
  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
      // Initialiser SignaturePad
      const canvas = this.signaturePadElement.nativeElement;
      this.signaturePad = new SignaturePad(canvas, {
          backgroundColor: '#ffffff', // Fond blanc pour le canvas
          penColor: '#000000', // Couleur de la signature
      });
  }

  // Effacer la signature
  clearSignature(): void {
      this.signaturePad.clear();
  }
  ngOnInit() {
    this.fetchClientData();
  }
  // Enregistrer la signature
  saveSignature(): void {
      if (this.signaturePad.isEmpty()) {
          alert('Veuillez fournir une signature avant de sauvegarder.');
          return;
      }

      // Récupérer la signature sous forme d'URL d'image
      const signatureImage = this.signaturePad.toDataURL();
      console.log('Signature sauvegardée :', signatureImage);

      // Vous pouvez envoyer cette image au serveur ou la stocker localement
      alert('Signature sauvegardée avec succès !');
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

}
