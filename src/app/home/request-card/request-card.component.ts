import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent {
  cardForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.cardForm = this.fb.group({
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

      // Type de carte
      typeCarte: ['', Validators.required],
      typeCarteAutre: [''],

      // Motif
      motif: ['', Validators.required],
      motifAutre: [''],

      // Modalité de retrait
      modaliteRetrait: ['', Validators.required],

      // Signature
      dateSignature: ['', Validators.required],
      signature: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.isSubmitting) return;
    
    if (this.cardForm.valid) {
      this.isSubmitting = true;
      
      const formData = {
        ...this.cardForm.value,
        clientId: localStorage.getItem('clientId'),
        submissionDate: new Date().toISOString(),
        status: 'en_attente'
      };

      this.http.post('http://localhost:5082/api/CardRequest/AddRequest', formData).subscribe({
        next: (response: any) => {
          alert('Demande de carte bancaire soumise avec succès!');
          this.cardForm.reset();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error submitting card request:', err);
          alert('Une erreur est survenue lors de la soumission de la demande.');
          this.isSubmitting = false;
        }
      });
    }
  }
}
