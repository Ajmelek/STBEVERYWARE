import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-check',
  templateUrl: './request-check.component.html',
  styleUrls: ['./request-check.component.scss']
})
export class RequestCheckComponent {
  checkForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.checkForm = this.fb.group({
      // Informations du Client
      nom: ['', Validators.required],
      cin: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.email]],

      // Informations Bancaires
      rib: ['', Validators.required],
      agence: ['', Validators.required],
      typeCompte: ['', Validators.required],

      // Détails de la Demande
      nombreChequiers: ['', Validators.required],
      motif: ['', Validators.required],
      motifAutre: [''],

      // Signature
      dateDemande: ['', Validators.required],
      signature: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.isSubmitting) return;
    
    if (this.checkForm.valid) {
      this.isSubmitting = true;
      
      const formData = {
        ...this.checkForm.value,
        clientId: localStorage.getItem('clientId'),
        submissionDate: new Date().toISOString(),
        status: 'en_attente'
      };

      this.http.post('http://localhost:5082/api/CheckRequest/AddRequest', formData).subscribe({
        next: (response: any) => {
          alert('Demande de chéquier soumise avec succès!');
          this.checkForm.reset();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error submitting check request:', err);
          alert('Une erreur est survenue lors de la soumission de la demande.');
          this.isSubmitting = false;
        }
      });
    }
  }
}
