import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import SignaturePad from 'signature_pad';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface CreateDemandeModificationClientDto {
  ClientID: number;
  IndicateurTel?: string;
  Adresse?: string;
  AdresseComplete?: string;
  AdresseLieuTravail?: string;
  Agence?: string;
  AgenceResidence?: string;
  Cin?: string;
  Civilite?: string;
  Clientautrebanque?: string;
  Codepostal?: string;
  ConfidenceRate?: string;
  DateRDV?: string;
  Datecin?: string;
  Datenaissance?: string;
  DeviseCompteReserved?: string;
  Environment?: string;
  Etatcivil?: string;
  Gouvernorat?: string;
  Mailprincipal?: string;
  Nationalite?: string;
  Nom?: string;
  Nommere?: string;
  Nompere?: string;
  Pays?: string;
  PaysRelations?: string;
  Paysnaissance?: string;
  Prenom?: string;
  Rcin?: string;
  Referentiel?: string;
  Resident?: string;
  Secondenationalite?: string;
  Selfie?: string;
  Statutpro?: string;
  Rib?: string;
  NumeroTelephone?: string;
  AutreNationalite?: string;
  Prenommere?: string;
  Prenompere?: string;
  Datedelivrance?: string;
  Motif?: string;
  Objetrelation?: string;
  Login?: string;
  Password?: string;
  Commentaire?: string;
}

interface Client {
  nom: string;
  prenom: string;
  civilite: string;
  paysNaissance: string;
  autreNationalite: string;
  agence: string;
  indicateurTel: string;
  codepostal: string;
  dateNaissance: string;
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
  datedelivrance: string;
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
  demandeForm: FormGroup;
  isSubmitting = false;
  signatureImage: string | null = null;

  @ViewChild('signaturePad', { static: false }) signaturePadElement!: ElementRef;
  signaturePad!: SignaturePad;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.demandeForm = this.fb.group({
      civilite: ['', Validators.required],
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      paysNaissance: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      numeroTelephone: ['', [Validators.required]],
      mailPrincipal: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      motif: ['', Validators.required],
      objetrelation: ['', Validators.required],
      nationalite: ['', Validators.required],
      autreNationalite: [''],
      prenomMere: ['', Validators.required],
      nomMere: ['', Validators.required],
      prenomPere: ['', Validators.required],
      nomPere: ['', Validators.required],
      etatCivil: ['', Validators.required],
      resident: ['', Validators.required],
      cin: ['', Validators.required],
      dateDelivrance: ['', Validators.required],
      agence: ['', Validators.required],
      natureActivite: [''],
      agenceDomiciliation: ['', Validators.required],
      typeCompte: ['', Validators.required],
      deviseCompte: ['', Validators.required],
      documentCIN: ['', Validators.required],
      documentJustificatif: ['', Validators.required],
      declaration: [false, Validators.requiredTrue],
      dateSigned: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    const canvas = this.signaturePadElement.nativeElement;
    this.signaturePad = new SignaturePad(canvas, {
      backgroundColor: '#ffffff',
      penColor: '#000000',
    });
  }

  ngOnInit() {
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



    this.http.get<Client>(`http://localhost:5082/api/Client/byLogin/${login}`).subscribe({
      next: (data) => {
        this.client = data;
        this.patchFormValues(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load client data';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  patchFormValues(clientData: Client) {
    this.demandeForm.patchValue({
      civilite: clientData.civilite,
      prenom: clientData.prenom,
      nom: clientData.nom,
      paysNaissance: clientData.paysNaissance,
      dateNaissance: clientData.dateNaissance,
      numeroTelephone: clientData.numeroTelephone,
      mailPrincipal: clientData.mailPrincipal,
      adresse: clientData.adresse,
      nationalite: clientData.nationalite,
      autreNationalite: clientData.autreNationalite,
      prenomMere: clientData.prenommere,
      nomMere: clientData.nomMere,
      prenomPere: clientData.prenompere,
      nomPere: clientData.nomPere,
      etatCivil: clientData.etatCivil,
      resident: clientData.resident,
      cin: clientData.cin,
      dateDelivrance: clientData.datedelivrance,
      agence: clientData.agence
    });
  }

  clearSignature(): void {
    this.signaturePad.clear();
    this.signatureImage = null;
  }

  saveSignature(): void {
    if (this.signaturePad.isEmpty()) {
      alert('Veuillez fournir une signature avant de sauvegarder.');
      return;
    }
    this.signatureImage = this.signaturePad.toDataURL();
  }

  onSubmit() {
    console.log("Starting form submission...");
    if (this.isSubmitting) return;
    
    if (!this.signatureImage) {
      alert('Veuillez fournir une signature avant de soumettre.');
      return;
    }

    this.isSubmitting = true;

    const formData: CreateDemandeModificationClientDto = {
      ClientID: 1,
      IndicateurTel: this.client?.indicateurTel || '',
      Adresse: this.demandeForm.get('adresse')?.value || '',
      AdresseComplete: '',
      AdresseLieuTravail: '',
      Agence: this.demandeForm.get('agence')?.value || '',
      AgenceResidence: '',
      Cin: this.demandeForm.get('cin')?.value || '',
      Civilite: this.demandeForm.get('civilite')?.value || '',
      Clientautrebanque: '',
      Codepostal: this.client?.codepostal || '',
      ConfidenceRate: '',
      DateRDV: '',
      Datecin: this.client?.datecin || '',
      Datenaissance: this.demandeForm.get('dateNaissance')?.value || '',
      DeviseCompteReserved: '',
      Environment: '',
      Etatcivil: this.demandeForm.get('etatCivil')?.value || '',
      Gouvernorat: '',
      Mailprincipal: this.demandeForm.get('mailPrincipal')?.value || '',
      Nationalite: this.demandeForm.get('nationalite')?.value || '',
      Nom: this.demandeForm.get('nom')?.value || '',
      Nommere: this.demandeForm.get('nomMere')?.value || '',
      Nompere: this.demandeForm.get('nomPere')?.value || '',
      Pays: '',
      PaysRelations: '',
      Paysnaissance: this.demandeForm.get('paysNaissance')?.value || '',
      Prenom: this.demandeForm.get('prenom')?.value || '',
      Rcin: '',
      Referentiel: '',
      Resident: this.demandeForm.get('resident')?.value || '',
      Secondenationalite: this.demandeForm.get('autreNationalite')?.value || '',
      Selfie: this.signatureImage,
      Statutpro: '',
      Rib: '',
      NumeroTelephone: this.demandeForm.get('numeroTelephone')?.value || '',
      AutreNationalite: this.demandeForm.get('autreNationalite')?.value || '',
      Prenommere: this.demandeForm.get('prenomMere')?.value || '',
      Prenompere: this.demandeForm.get('prenomPere')?.value || '',
      Datedelivrance: this.demandeForm.get('dateDelivrance')?.value || '',
      Motif: this.demandeForm.get('motif')?.value || '',
      Objetrelation: this.demandeForm.get('objetrelation')?.value || '',
      Login: '',
      Password: '',
      Commentaire: ''
    };

    console.log('Submitting form data:', JSON.stringify(formData, null, 2));

    this.http.post('http://localhost:5082/api/Demande/AddDemande', formData).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        alert('Demande soumise avec succès! ID: ' + response.demandeId);
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Detailed error:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        console.error('Error response:', err.error);
        
        let errorMessage = 'Une erreur est survenue lors de la soumission du formulaire.';
        if (err.error?.message) {
          errorMessage += ` Détails: ${err.error.message}`;
        }
        if (err.error?.errors) {
          errorMessage += '\nErreurs de validation:';
          Object.keys(err.error.errors).forEach(key => {
            errorMessage += `\n- ${key}: ${err.error.errors[key].join(', ')}`;
          });
        }
        alert(errorMessage);
        this.isSubmitting = false;
      }
    });
  }
}