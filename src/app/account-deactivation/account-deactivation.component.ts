import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account-deactivation',
  templateUrl: './account-deactivation.component.html',
  styleUrls: ['./account-deactivation.component.scss']
})
export class AccountDeactivationComponent {
  email: string = '';
  emailError: boolean = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

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
        // Get clientId from AuthService
        const clientIdStr = this.authService.getClientId();
        const clientId = clientIdStr ? parseInt(clientIdStr, 10) : 0;
        if (!clientId || isNaN(clientId)) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Impossible de récupérer votre identifiant client. Veuillez vous reconnecter.',
            confirmButtonColor: '#dc3545',
          });
          return;
        }
        // Call the API
        this.http.post('http://localhost:5082/api/DeactivateAccount', {
          clientId: clientId,
          email: this.email
        }).subscribe({
          next: () => {
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
              this.email = '';
              this.router.navigate(['/home']);
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: err?.error?.message || 'Une erreur est survenue lors de la demande de désactivation.',
              confirmButtonColor: '#dc3545',
            });
          }
        });
      }
    });
  }
}
