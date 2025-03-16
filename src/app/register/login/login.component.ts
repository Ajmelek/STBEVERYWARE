import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2Data } from 'ng-select2-component';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  LoginForm: FormGroup | any;
isLoading = false

  constructor(private fb: FormBuilder,private router:Router, private loginService : LoginService) {
    this.createForm();

   }

  ngOnInit(): void {
    localStorage.removeItem("tiersClient")
    localStorage.setItem("ret","");
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

  Authenticate(){
this.isLoading = true
    this.loginService.Authentifiaction(this.f?.['login'].value,this.f?.['pwd'].value)
    // this.Authentifiaction(this.f?.['login'].value,this.f?.['pwd'].value)
    .subscribe(data => {
      this.isLoading= false
     console.log(data);
      localStorage.setItem("login",this.f?.['login'].value.trim())

     localStorage.setItem("token",data.body.access_token)
     this.router.navigate(['home']);



    }, err => {
      this.router.navigate(['home']);

      // Swal.fire({
      //   title: 'Echec Login !!',
      //   text: 'Vérifier votre login et/ou mot de passe pour continuer',
      //   icon: 'warning',
      // })
    
    });

  }

 
 
}
