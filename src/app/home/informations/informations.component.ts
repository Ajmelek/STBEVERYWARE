import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import SignaturePad from 'signature_pad';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  id: number;
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
  @ViewChild('documentCIN', { static: false }) documentCINElement!: ElementRef;
  @ViewChild('documentJustificatif', { static: false }) documentJustificatifElement!: ElementRef;
  signaturePad!: SignaturePad;

  constructor(private http: HttpClient, private fb: FormBuilder, private authService: AuthService) {
    this.demandeForm = this.fb.group({
      civilite: ['', Validators.required],
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      paysNaissance: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      numeroTelephone: ['', [Validators.required]],
      mailPrincipal: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      motif: [{ value: '', disabled: true }, Validators.required],
      objetrelation: [{ value: '', disabled: true }, Validators.required],
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
        console.log('Client data received:', data);
        this.client = data;
        
        // Store client ID in auth service if not already stored
        if (data && data.id && !this.authService.getClientId()) {
          this.authService.setClientId(data.id.toString());
          console.log('Stored client ID from API response:', data.id);
        }
        
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

    // Get client ID from multiple sources
    let clientId = this.client?.id;
    if (!clientId) {
      // Try alternative property names that might be used in the API response
      clientId = (this.client as any)?.id || (this.client as any)?.client_id || (this.client as any)?.Id || (this.client as any)?.ClientId;
    }
    if (!clientId) {
      // Try to get from JWT token
      const tokenClientId = this.getClientIdFromToken();
      if (tokenClientId !== null) {
        clientId = tokenClientId;
      }
    }
    if (!clientId) {
      // Try to get from localStorage
      const storedClientId = this.authService.getClientId();
      if (storedClientId) {
        clientId = parseInt(storedClientId);
      }
    }
    
    console.log('Client ID being used:', clientId);
    console.log('Client object:', this.client);
    console.log('Stored client ID from auth service:', this.authService.getClientId());

    if (!clientId) {
      alert('Client ID not found. Please login again.');
      this.isSubmitting = false;
      return;
    }

    this.isSubmitting = true;

    // Create FormData object
    const formData = new FormData();

    // Add all fields as per Swagger API specification
    const formValues = this.demandeForm.value;
    
    // Required fields from Swagger
    formData.append('Etat', '0');
    formData.append('ClientID', clientId.toString());
    formData.append('Objetrelation', formValues.objetrelation || '');
    formData.append('IndicateurTel', this.client?.indicateurTel || '');
    formData.append('Referentiel', '');
    formData.append('Civilite', formValues.civilite || '');
    formData.append('Cin', formValues.cin || '');
    formData.append('Selfie', '');
    formData.append('Nationalite', formValues.nationalite || '');
    formData.append('AdresseComplete', '');
    formData.append('NumeroTelephone', formValues.numeroTelephone || '');
    formData.append('Prenom', formValues.prenom || '');
    formData.append('Login', '');
    formData.append('ConfidenceRate', '');
    formData.append('Rib', '');
    formData.append('Pays', '');
    formData.append('PaysRelations', '');
    formData.append('Nom', formValues.nom || '');
    formData.append('DocumentCIN', '');
    formData.append('Gouvernorat', '');
    formData.append('DocumentJustificatif', '');
    formData.append('DeviseCompteReserved', '');
    formData.append('Adresse', formValues.adresse || '');
    formData.append('Motif', formValues.motif || '');
    formData.append('Resident', formValues.resident || '');
    formData.append('Agence', formValues.agence || '');
    formData.append('Etatcivil', formValues.etatCivil || '');
    formData.append('Prenompere', formValues.prenomPere || '');
    formData.append('Environment', '');
    formData.append('Prenommere', formValues.prenomMere || '');
    formData.append('Nompere', formValues.nomPere || '');
    formData.append('AdresseLieuTravail', '');
    formData.append('AgenceResidence', '');
    formData.append('AutreNationalite', formValues.autreNationalite || '');
    formData.append('DateRDV', '');
    formData.append('Rcin', '');
    formData.append('Mailprincipal', formValues.mailPrincipal || '');
    formData.append('Datenaissance', formValues.dateNaissance || '');
    formData.append('Nommere', formValues.nomMere || '');
    formData.append('Secondenationalite', formValues.autreNationalite || '');
    formData.append('Datedelivrance', formValues.dateDelivrance || '');
    formData.append('Codepostal', this.client?.codepostal || '');
    formData.append('Statutpro', '');
    formData.append('Clientautrebanque', '');
    formData.append('Datecin', this.client?.datecin || '');
    formData.append('Commentaire', '');
    formData.append('Paysnaissance', formValues.paysNaissance || '');
    formData.append('Password', '');
    formData.append('SignaturePath', '');

    // Handle file uploads - get files directly from DOM elements
    const documentCINFile = this.documentCINElement?.nativeElement?.files?.[0];
    if (documentCINFile) {
      console.log('Document CIN file found:', documentCINFile.name);
      formData.append('DocumentCINFile', documentCINFile);
    } else {
      console.log('No Document CIN file selected');
    }

    const documentJustificatifFile = this.documentJustificatifElement?.nativeElement?.files?.[0];
    if (documentJustificatifFile) {
      console.log('Document Justificatif file found:', documentJustificatifFile.name);
      formData.append('DocumentJustificatifFile', documentJustificatifFile);
    } else {
      console.log('No Document Justificatif file selected');
    }

    // Convert signature from base64 to Blob and append as file
    if (this.signatureImage) {
      // Remove data URL prefix to get base64 string
      const base64Data = this.signatureImage.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const signatureBlob = new Blob([byteArray], { type: 'image/png' });
      formData.append('SignatureFile', signatureBlob, 'signature.png');
    }

    console.log('Submitting FormData to API...');

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

  private getClientIdFromToken(): number | null {
    try {
      const token = this.authService.getToken();
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('JWT payload:', payload);
        // Try to get client ID from JWT claims
        return payload.nameidentifier || payload.sub || payload.clientId || payload.client_id || null;
      }
    } catch (error) {
      console.error('Error parsing JWT token:', error);
    }
    return null;
  }
}