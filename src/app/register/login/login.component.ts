import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2Data } from 'ng-select2-component';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  LoginForm: FormGroup | any;
  isLoading = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.authService.logout(); // Clear any existing auth data
    this.f?.['login'].setValue("");
    this.f?.['pwd'].setValue("");
  }

  private extractClientIdFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('JWT payload:', payload);
      console.log('Available JWT claims:', Object.keys(payload));
      
      // Try to get client ID from JWT claims
      const clientId = payload.nameidentifier || payload.sub || payload.clientId || payload.client_id || payload.nameidentifier || payload.userId || payload.id;
      console.log('Extracted client ID:', clientId);
      
      if (clientId) {
        return clientId.toString();
      }
      
      console.log('No client ID found in JWT token');
      return null;
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      return null;
    }
  }

  private fetchAndStoreClientId(username: string): void {
    this.http.get<any>(`http://localhost:5082/api/Client/byLogin/${username}`).subscribe({
      next: (data) => {
        console.log('Client data from API:', data);
        if (data && data.id) {
          this.authService.setClientId(data.id.toString());
          console.log('Stored client ID from API:', data.id);
        }
      },
      error: (err) => {
        console.error('Error fetching client data:', err);
      }
    });
  }

  createForm() {
    this.LoginForm = this.fb.group({
      login: ['', Validators.required],
      pwd: ['', Validators.required]
    })
  }
  
  get f() { return this.LoginForm.controls; }

  Authenticate() {
    this.isLoading = true;
    const username = this.f?.['login'].value;
    const password = this.f?.['pwd'].value;

    // Try Admin login first
    this.loginService.AuthentifiactionAdmin(username, password)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Admin login response:', response);
          
          if (response.body && response.body.token) {
            this.authService.setUsername(username.trim());
            this.authService.setToken(response.body.token);
            this.authService.setUserRole('admin');
            this.router.navigate(['/admin/kyc']);
            return;
          }
          
          // If not admin, try SuperAdmin
          this.loginService.AuthentifiactionSuperAdmin(username, password)
            .subscribe({
              next: (superAdminResponse) => {
                this.isLoading = false;
                console.log('SuperAdmin login response:', superAdminResponse);
                
                if (superAdminResponse.body && superAdminResponse.body.token) {
                  this.authService.setUsername(username.trim());
                  this.authService.setToken(superAdminResponse.body.token);
                  this.authService.setUserRole('superadmin');
                  this.router.navigate(['/super-admin/clients']);
                  return;
                }
                
                // If not SuperAdmin, try Client login
                this.loginService.Authentifiaction(username, password)
                  .subscribe({
                    next: (clientResponse) => {
                      this.isLoading = false;
                      console.log('Client login response:', clientResponse);
                      
                      if (clientResponse.body && clientResponse.body.token) {
                        this.authService.setUsername(username.trim());
                        this.authService.setToken(clientResponse.body.token);
                        this.authService.setUserRole('client');
                        
                        // Extract and store client ID from JWT token
                        const clientId = this.extractClientIdFromToken(clientResponse.body.token);
                        if (clientId) {
                          this.authService.setClientId(clientId);
                          console.log('Stored client ID from JWT:', clientId);
                        } else {
                          // Fallback: fetch client ID from API
                          console.log('JWT extraction failed, fetching from API...');
                          this.fetchAndStoreClientId(username.trim());
                        }
                        
                        this.router.navigate(['/home']);
                      } else {
                        Swal.fire({
                          title: 'Login Error',
                          text: 'Invalid credentials',
                          icon: 'error',
                        });
                      }
                    },
                    error: (error) => {
                      this.isLoading = false;
                      console.error('CLIENT LOGIN ERROR:', error);
                      console.error('CLIENT LOGIN URL:', error?.url);
                      console.log('Error status:', error?.status);
                      console.log('Error errorCode:', error?.error?.errorCode);
                      console.log('Error message:', error?.error?.message);

                      const status = error?.status;
                      const errorCode = error?.error?.errorCode;
                      const message = error?.error?.message;

                      if (status === 402 && errorCode === 402 && message && message.includes('deactivated')) {
                        Swal.fire({
                          title: 'Compte désactivé',
                          text: 'Votre compte est désactivé, vous ne pouvez pas vous connecter.',
                          icon: 'error',
                        });
                      } else if (status === 401 && message && message.includes('Invalid')) {
                        Swal.fire({
                          title: 'Échec de Connexion',
                          text: 'Nom d\'utilisateur ou mot de passe incorrect',
                          icon: 'error',
                        });
                      } else if (message) {
                        Swal.fire({
                          title: 'Erreur de Connexion',
                          text: message,
                          icon: 'error',
                        });
                      } else {
                        Swal.fire({
                          title: 'Erreur de Connexion',
                          text: 'Une erreur inconnue s\'est produite',
                          icon: 'error',
                        });
                      }
                    }
                  });
              },
              error: (error) => {
                // Disable all logs and popups for SuperAdmin login temporarily
                // Do NOT log or show Swal.fire here temporarily
                // If SuperAdmin login fails, try Client login
                this.loginService.Authentifiaction(username, password)
                  .subscribe({
                    next: (clientResponse) => {
                      this.isLoading = false;
                      console.log('Client login response:', clientResponse);
                      
                      if (clientResponse.body && clientResponse.body.token) {
                        this.authService.setUsername(username.trim());
                        this.authService.setToken(clientResponse.body.token);
                        this.authService.setUserRole('client');
                        
                        // Extract and store client ID from JWT token
                        const clientId = this.extractClientIdFromToken(clientResponse.body.token);
                        if (clientId) {
                          this.authService.setClientId(clientId);
                          console.log('Stored client ID:', clientId);
                        } else {
                          // Fallback: fetch client ID from API
                          console.log('JWT extraction failed, fetching from API...');
                          this.fetchAndStoreClientId(username.trim());
                        }
                        
                        this.router.navigate(['/home']);
                      } else {
                        Swal.fire({
                          title: 'Login Error',
                          text: 'Invalid credentials',
                          icon: 'error',
                        });
                      }
                    },
                    error: (error) => {
                      this.isLoading = false;
                      console.error('CLIENT LOGIN ERROR:', error);
                      console.error('CLIENT LOGIN URL:', error?.url);
                      console.log('Error status:', error?.status);
                      console.log('Error errorCode:', error?.error?.errorCode);
                      console.log('Error message:', error?.error?.message);

                      const status = error?.status;
                      const errorCode = error?.error?.errorCode;
                      const message = error?.error?.message;

                      if (status === 402 && errorCode === 402 && message && message.includes('deactivated')) {
                        Swal.fire({
                          title: 'Compte désactivé',
                          text: 'Votre compte est désactivé, vous ne pouvez pas vous connecter.',
                          icon: 'error',
                        });
                      } else if (status === 401 && message && message.includes('Invalid')) {
                        Swal.fire({
                          title: 'Échec de Connexion',
                          text: 'Nom d\'utilisateur ou mot de passe incorrect',
                          icon: 'error',
                        });
                      } else if (message) {
                        Swal.fire({
                          title: 'Erreur de Connexion',
                          text: message,
                          icon: 'error',
                        });
                      } else {
                        Swal.fire({
                          title: 'Erreur de Connexion',
                          text: 'Une erreur inconnue s\'est produite',
                          icon: 'error',
                        });
                      }
                    }
                  });
              }
            });
        },
        error: (error) => {
          // Disable all logs and popups for Admin login temporarily
          // Do NOT log or show Swal.fire here temporarily
          // If Admin login fails, try SuperAdmin
          this.loginService.AuthentifiactionSuperAdmin(username, password)
            .subscribe({
              next: (superAdminResponse) => {
                this.isLoading = false;
                console.log('SuperAdmin login response:', superAdminResponse);
                
                if (superAdminResponse.body && superAdminResponse.body.token) {
                  this.authService.setUsername(username.trim());
                  this.authService.setToken(superAdminResponse.body.token);
                  this.authService.setUserRole('superadmin');
                  this.router.navigate(['/super-admin/clients']);
                  return;
                }
                
                // If not SuperAdmin, try Client login
                this.loginService.Authentifiaction(username, password)
                  .subscribe({
                    next: (clientResponse) => {
                      this.isLoading = false;
                      console.log('Client login response:', clientResponse);
                      
                      if (clientResponse.body && clientResponse.body.token) {
                        this.authService.setUsername(username.trim());
                        this.authService.setToken(clientResponse.body.token);
                        this.authService.setUserRole('client');
                        
                        // Extract and store client ID from JWT token
                        const clientId = this.extractClientIdFromToken(clientResponse.body.token);
                        if (clientId) {
                          this.authService.setClientId(clientId);
                          console.log('Stored client ID:', clientId);
                        } else {
                          // Fallback: fetch client ID from API
                          console.log('JWT extraction failed, fetching from API...');
                          this.fetchAndStoreClientId(username.trim());
                        }
                        
                        this.router.navigate(['/home']);
                      } else {
                        Swal.fire({
                          title: 'Login Error',
                          text: 'Invalid credentials',
                          icon: 'error',
                        });
                      }
                    },
                    error: (error) => {
                      this.isLoading = false;
                      console.error('Client login error:', error);
                      console.log('Error status:', error?.status);
                      console.log('Error errorCode:', error?.error?.errorCode);
                      console.log('Error message:', error?.error?.message);

                      const status = error?.status;
                      const errorCode = error?.error?.errorCode;
                      const message = error?.error?.message;

                      if (status === 402 && errorCode === 402 && message && message.includes('deactivated')) {
                        Swal.fire({
                          title: 'Compte désactivé',
                          text: 'Votre compte est désactivé, vous ne pouvez pas vous connecter.',
                          icon: 'error',
                        });
                      } else if (status === 401 && message && message.includes('Invalid')) {
                        Swal.fire({
                          title: 'Échec de Connexion',
                          text: 'Nom d\'utilisateur ou mot de passe incorrect',
                          icon: 'error',
                        });
                      } else if (message) {
                        Swal.fire({
                          title: 'Erreur de Connexion',
                          text: message,
                          icon: 'error',
                        });
                      } else {
                        Swal.fire({
                          title: 'Erreur de Connexion',
                          text: 'Une erreur inconnue s\'est produite',
                          icon: 'error',
                        });
                      }
                    }
                  });
              },
              error: (error) => {
                // Disable all logs and popups for SuperAdmin login temporarily
                // Do NOT log or show Swal.fire here temporarily
                // If SuperAdmin login fails, try Client login
                this.loginService.Authentifiaction(username, password)
                  .subscribe({
                    next: (clientResponse) => {
                      this.isLoading = false;
                      console.log('Client login response:', clientResponse);
                      
                      if (clientResponse.body && clientResponse.body.token) {
                        this.authService.setUsername(username.trim());
                        this.authService.setToken(clientResponse.body.token);
                        this.authService.setUserRole('client');
                        
                        // Extract and store client ID from JWT token
                        const clientId = this.extractClientIdFromToken(clientResponse.body.token);
                        if (clientId) {
                          this.authService.setClientId(clientId);
                          console.log('Stored client ID:', clientId);
                        } else {
                          // Fallback: fetch client ID from API
                          console.log('JWT extraction failed, fetching from API...');
                          this.fetchAndStoreClientId(username.trim());
                        }
                        
                        this.router.navigate(['/home']);
                      } else {
                        Swal.fire({
                          title: 'Login Error',
                          text: 'Invalid credentials',
                          icon: 'error',
                        });
                      }
                    },
                    error: (error) => {
                      this.isLoading = false;
                      console.error('CLIENT LOGIN ERROR:', error);
                      console.error('CLIENT LOGIN URL:', error?.url);
                      console.log('Error status:', error?.status);
                      console.log('Error errorCode:', error?.error?.errorCode);
                      console.log('Error message:', error?.error?.message);

                      const status = error?.status;
                      const errorCode = error?.error?.errorCode;
                      const message = error?.error?.message;

                      if (status === 402 && errorCode === 402 && message && message.includes('deactivated')) {
                        Swal.fire({
                          title: 'Compte désactivé',
                          text: 'Votre compte est désactivé, vous ne pouvez pas vous connecter.',
                          icon: 'error',
                        });
                      } else if (status === 401 && message && message.includes('Invalid')) {
                        Swal.fire({
                          title: 'Échec de Connexion',
                          text: 'Nom d\'utilisateur ou mot de passe incorrect',
                          icon: 'error',
                        });
                      } else if (message) {
                        Swal.fire({
                          title: 'Erreur de Connexion',
                          text: message,
                          icon: 'error',
                        });
                      } else {
                        Swal.fire({
                          title: 'Erreur de Connexion',
                          text: 'Une erreur inconnue s\'est produite',
                          icon: 'error',
                        });
                      }
                    }
                  });
              }
            });
        }
      });
  }
}