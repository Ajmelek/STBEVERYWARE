import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Client {
  rib: string;
  
}

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})

  export class CreateAccountComponent implements OnInit {

    client: Client | null = null;
    isLoading = true;
    error: string | null = null;
  
    constructor(private http: HttpClient , private router: Router) {}
  
    ngOnInit(): void {
      this.fetchClientData();
    }
  
    fetchClientData() {
    const login = localStorage.getItem('login');
    this.http.get<Client>(`http://localhost:5082/api/Client/byLogin/${login}`).subscribe({
        next: (data) => {
          this.client = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load client data';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }