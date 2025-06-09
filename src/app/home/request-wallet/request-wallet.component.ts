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
  showOtpField = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.walletForm = this.fb.group({
      telephone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  onSubmit(): void {
    if (this.isSubmitting) return;
    this.walletForm.markAllAsTouched();

    if (!this.showOtpField) {
      if (this.walletForm.get('telephone')?.valid && this.walletForm.get('email')?.valid) {
        this.sendOtp();
      } else {
        alert('Veuillez corriger les erreurs dans le formulaire');
      }
      return;
    }

    this.verifyAndSubmit();
  }

  sendOtp(): void {
    this.isSubmitting = true;
    const email = this.walletForm.get('email')?.value;

    this.http.post('http://localhost:5082/api/Email/send', {
      toEmail: email,
      subject: 'Votre code OTP',
      recipientName: 'Client'
    }).subscribe({
      next: (res: any) => {
        this.showOtpField = true;
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error(err);
        alert('Erreur d\'envoi d\'OTP');
        this.isSubmitting = false;
      }
    });
  }

  verifyAndSubmit(): void {
    this.isSubmitting = true;
    const formData = {
      clientId: parseInt(localStorage.getItem('clientId') || '0'),
      telephone: this.walletForm.get('telephone')?.value,
      adresseMail: this.walletForm.get('email')?.value,
      dateDemande: new Date().toISOString(),
      etat: 0
    };

    // First verify OTP
    this.http.post('http://localhost:5082/api/Email/verify', {
      toEmail: this.walletForm.get('email')?.value,
      otp: this.walletForm.get('otp')?.value
    }).subscribe({
      next: (otpRes: any) => {
        if (otpRes.success) {
          // Log the request payload for debugging
          console.log('Sending wallet request with data:', formData);
          
          // Then submit wallet request to DemandeWallet endpoint
          this.http.post('http://localhost:5082/api/DemandeWallet', formData)
            .subscribe({
              next: (walletRes: any) => {
                alert('Votre demande de wallet a été enregistrée avec succès!');
                this.walletForm.reset();
                this.showOtpField = false;
                this.isSubmitting = false;
              },
              error: (err) => {
                if (err.status === 400) {
                  console.error('Bad Request Error:', err.error);
                  alert('Erreur de validation: ' + (err.error?.message || 'Données invalides'));
                } else {
                  this.handleError(err);
                }
              }
            });
        } else {
          alert('Code OTP invalide');
          this.isSubmitting = false;
        }
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  private handleError(error: any): void {
    console.error('Error details:', error);
    this.isSubmitting = false;
    
    if (error.status === 0) {
      alert('Serveur inaccessible');
    } else if (error.status === 400) {
      alert(`Erreur de validation: ${error.error?.message || 'Données invalides'}`);
    } else {
      alert(`Erreur: ${error.status} - ${error.error?.message || error.message}`);
    }
  }
}