import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-deactivation',
  templateUrl: './account-deactivation.component.html',
  styleUrls: ['./account-deactivation.component.scss']
})
export class AccountDeactivationComponent {
  email: string = '';
  emailError: boolean = false;

  constructor(private router: Router) {}

  goBack() {
    // Navigate back to the previous page or home
    this.router.navigate(['/home']);
  }

  validateEmail(): boolean {
    if (!this.email || this.email.trim() === '') {
      this.emailError = true;
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailError = true;
      return false;
    }
    
    this.emailError = false;
    return true;
  }

  confirmDeactivation() {
    // Validate email first
    if (!this.validateEmail()) {
      return;
    }

    // Show confirmation dialog with SweetAlert2
    Swal.fire({
      title: 'Confirmer la désactivation',
      text: `Êtes-vous absolument sûr de vouloir désactiver votre compte ? Cette action est irréversible. Un e-mail de confirmation sera envoyé à ${this.email}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Oui, désactiver',
      cancelButtonText: 'Annuler',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Here you would typically call your service to deactivate the account
        // For now, we'll just show a success message
        this.showSuccessMessage();
      }
    });
  }

  private showSuccessMessage() {
    Swal.fire({
      icon: 'success',
      title: 'Demande envoyée !',
      text: 'Demande de désactivation du compte envoyée avec succès.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#28a745',
      timer: 4000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then(() => {
      this.router.navigate(['/home']);
    });
  }
}
