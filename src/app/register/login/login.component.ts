import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2Data } from 'ng-select2-component';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.authService.logout(); // Clear any existing auth data
    this.f?.['login'].setValue("");
    this.f?.['pwd'].setValue("");
  }

  createForm() {
    this.LoginForm = this.fb.group({
      login: ['', Validators.required],
      pwd: ['', Validators.required]
    })
  }
  
  get f() { return this.LoginForm.controls; }

  Authenticate() {
    this.isLoading = true
    this.loginService.Authentifiaction(this.f?.['login'].value, this.f?.['pwd'].value)
      .subscribe(
        response => {
          this.isLoading = false;
          console.log(response);
          
          if (response.body && response.body.token) {
            this.authService.setUsername(this.f?.['login'].value.trim());
            this.authService.setToken(response.body.token);
            this.router.navigate(['home']);
          } else {
            console.log(response.body);
            
            Swal.fire({
              title: 'Login Error',
              text: 'Invalid response from server',
              icon: 'error',
            });
          }
        }, 
        error => {
          this.isLoading = false;
          Swal.fire({
            title: 'Login Failed',
            text: 'Please check your username and password',
            icon: 'error',
          });
        }
      );
  }
}