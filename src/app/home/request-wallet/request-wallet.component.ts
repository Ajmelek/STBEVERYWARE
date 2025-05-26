import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-wallet',
  templateUrl: './request-wallet.component.html',
  styleUrls: ['./request-wallet.component.scss']
})
export class RequestWalletComponent {
  walletForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.walletForm = this.fb.group({
      // Informations Personnelles
      nom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      lieuNaissance: ['', Validators.required],
      cin: ['', Validators.required],
      adresse: ['', Validators.required],
      codePostal: ['', Validators.required],
      gouvernorat: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      // Informations Bancaires
      rib: ['', Validators.required],
      typeCompte: ['', Validators.required],

      // Choix du Wallet
      fournisseurWallet: ['', Validators.required],
      fournisseurWalletAutre: [''],

      // Motif
      motif: ['', Validators.required],
      motifAutre: [''],

      // Modalité de réception
      modaliteReception: ['', Validators.required],

      // Signature
      dateSignature: ['', Validators.required],
      signature: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.isSubmitting) return;
    
    if (this.walletForm.valid) {
      this.isSubmitting = true;
      
      const formData = {
        ...this.walletForm.value,
        clientId: localStorage.getItem('clientId'),
        submissionDate: new Date().toISOString(),
        status: 'en_attente'
      };

      this.http.post('http://localhost:5082/api/WalletRequest/AddRequest', formData).subscribe({
        next: (response: any) => {
          alert('Demande de wallet électronique soumise avec succès!');
          this.walletForm.reset();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error submitting wallet request:', err);
          alert('Une erreur est survenue lors de la soumission de la demande.');
          this.isSubmitting = false;
        }
      });
    }
  }
} 