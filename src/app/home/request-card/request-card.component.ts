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
  showOtpField = false;
  sentOtp: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.cardForm = this.fb.group({
      typeCarte: ['', Validators.required],
      typeCarteAutre: [''],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    // Conditionally require typeCarteAutre if typeCarte is 'autre'
    this.cardForm.get('typeCarte')?.valueChanges.subscribe(value => {
      const typeCarteAutreControl = this.cardForm.get('typeCarteAutre');
      if (value === 'autre') {
        typeCarteAutreControl?.setValidators([Validators.required]);
      } else {
        typeCarteAutreControl?.clearValidators();
        typeCarteAutreControl?.setValue('');
      }
      typeCarteAutreControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.isSubmitting) return;

    this.cardForm.markAllAsTouched();

    if (!this.showOtpField) {
      // First submission: validate initial fields and send OTP
      const initialControls = ['typeCarte', 'email', 'telephone'];
      const isInitialValid = initialControls.every(control => this.cardForm.get(control)?.valid);
      const isTypeCarteAutreValid = this.cardForm.get('typeCarte')?.value !== 'autre' || 
                                    this.cardForm.get('typeCarteAutre')?.valid;

      if (isInitialValid && isTypeCarteAutreValid) {
        this.sendOtp();
      } else {
        alert('Veuillez remplir tous les champs obligatoires correctement.');
      }
      return;
    }

    // Second submission: verify OTP and submit card request
    this.verifyAndSubmit();
  }

  sendOtp(): void {
    this.isSubmitting = true;
    const email = this.cardForm.get('email')?.value;

    this.http.post('http://localhost:5082/api/Email/send', {
      toEmail: email,
      subject: 'Votre code OTP pour la demande de carte bancaire',
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
    if (!this.cardForm.get('otp')?.valid) {
      alert('Veuillez entrer un code OTP valide (6 chiffres).');
      return;
    }

    this.isSubmitting = true;
    const email = this.cardForm.get('email')?.value;
    const otp = this.cardForm.get('otp')?.value;

    // Verify OTP first
    this.http.post('http://localhost:5082/api/Email/verify', {
      toEmail: email,
      otp: otp
    }).subscribe({
      next: (verificationResponse: any) => {
        if (verificationResponse.success) {
          // OTP verified, submit card request
          this.submitCardRequest();
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

  submitCardRequest(): void {
   const formData = {
    TypeDeCarte: this.cardForm.get('typeCarte')?.value, // Directly use the selected value
    AdresseEmail: this.cardForm.get('email')?.value,
    Telephone: this.cardForm.get('telephone')?.value,
    ClientId: localStorage.getItem('clientId')
  };

    this.http.post('http://localhost:5082/api/DemandeDeCarteBancaire', formData).subscribe({
      next: (response: any) => {
        alert('Demande de carte bancaire soumise avec succès!');
        this.cardForm.reset();
        this.showOtpField = false;
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error submitting card request:', err);
        this.handleCardError(err);
        this.isSubmitting = false;
      }
    });
  }

  private handleCardError(error: any): void {
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