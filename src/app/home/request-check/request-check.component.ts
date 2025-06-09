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
  showOtpField = false;
  sentOtp: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.checkForm = this.fb.group({
      telephone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      nombreChequiers: ['', [Validators.required, Validators.min(1)]],
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  onSubmit(): void {
    if (this.isSubmitting) return;

    this.checkForm.markAllAsTouched();

    if (!this.showOtpField) {
      // First submission: send OTP
      const initialControls = ['telephone', 'email', 'nombreChequiers'];
      const isInitialValid = initialControls.every(control => this.checkForm.get(control)?.valid);

      if (isInitialValid) {
        this.sendOtp();
      } else {
        alert('Veuillez remplir tous les champs obligatoires correctement.');
      }
      return;
    }

    // Second submission: verify OTP and submit check request
    this.verifyAndSubmit();
  }

  sendOtp(): void {
    this.isSubmitting = true;
    const email = this.checkForm.get('email')?.value;

    this.http.post('http://localhost:5082/api/Email/send', {
      toEmail: email,
      subject: 'Votre code OTP pour la demande de chéquier',
      recipientName: 'Client STB'
    }).subscribe({
      next: (response: any) => {
        this.sentOtp = response.otp;
        this.showOtpField = true;
        this.isSubmitting = false;
        alert(`Un code OTP a été envoyé à ${email}`);
      },
      error: (err) => {
        console.error('Error sending OTP:', err);
        alert('Erreur lors de l\'envoi du code OTP');
        this.isSubmitting = false;
      }
    });
  }

  verifyAndSubmit(): void {
    if (!this.checkForm.get('otp')?.valid) {
      alert('Veuillez entrer un code OTP valide (6 chiffres).');
      return;
    }

    this.isSubmitting = true;
    const email = this.checkForm.get('email')?.value;
    const otp = this.checkForm.get('otp')?.value;

    // Verify OTP first
    this.http.post('http://localhost:5082/api/Email/verify', {
      toEmail: email,
      otp: otp
    }).subscribe({
      next: (verificationResponse: any) => {
        if (verificationResponse.success) {
          // OTP verified, submit check request
          this.submitCheckRequest();
        } else {
          alert('Code OTP invalide ou expiré');
          this.isSubmitting = false;
        }
      },
      error: (err) => {
        console.error('Error verifying OTP:', err);
        alert('Erreur lors de la vérification du code OTP');
        this.isSubmitting = false;
      }
    });
  }

  submitCheckRequest(): void {
    const formData = {
    Telephone: this.checkForm.get('telephone')?.value,
    AdresseEmail: this.checkForm.get('email')?.value,
    NombreChequiersDemandes: this.checkForm.get('nombreChequiers')?.value,
    ClientId: localStorage.getItem('clientId')
  };

    this.http.post('http://localhost:5082/api/DemandeDeChequier', formData).subscribe({
      next: (response: any) => {
        alert('Demande de chéquier soumise avec succès!');
        this.checkForm.reset();
        this.showOtpField = false;
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error submitting check request:', err);
        this.handleCheckError(err);
        this.isSubmitting = false;
      }
    });
  }

  private handleCheckError(error: any): void {
    if (error.status === 0) {
      alert('Impossible de se connecter au serveur. Vérifiez votre connexion internet.');
    } else if (error.status === 400) {
      alert('Données invalides: ' + (error.error?.message || ''));
    } else if (error.status === 401) {
      alert('Authentification requise');
    } else {
      alert(`Erreur serveur (${error.status}): ${error.message}`);
    }
  }
}