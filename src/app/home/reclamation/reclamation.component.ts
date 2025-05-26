import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent {
  reclamationForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.reclamationForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10)]] // Changed from 'message' to 'description'
    });
  }

  onSubmit() {
    if (this.isSubmitting || !this.reclamationForm.valid) return;
    
    this.isSubmitting = true;
    
    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
      alert('Client ID not found. Please login again.');
      this.isSubmitting = false;
      return;
    }

    const reclamationData = {
      ClientId: parseInt(clientId), // Ensure this matches your DTO
      Description: this.reclamationForm.get('description')?.value
    };

    this.http.post('http://localhost:5082/api/Reclamation', reclamationData).subscribe({
      next: (response: any) => {
        alert('Réclamation soumise avec succès!');
        this.reclamationForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error submitting reclamation:', err);
        alert('Une erreur est survenue lors de la soumission de la réclamation.');
        this.isSubmitting = false;
      }
    });
  }
}