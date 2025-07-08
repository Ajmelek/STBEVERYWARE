import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-gestion-desactivation-compte',
  templateUrl: './gestion-desactivation-compte.component.html',
  styleUrls: ['./gestion-desactivation-compte.component.scss']
})
export class GestionDesactivationCompteComponent implements OnInit {
  clients: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:5082/api/DeactivateAccount').subscribe({
      next: (deactivateAccounts) => {
        console.log('DeactivateAccount response:', deactivateAccounts);
        
        // Create array of HTTP requests for client details
        const clientRequests = deactivateAccounts.map(deactivateAccount => 
          this.http.get<any>(`http://localhost:5082/api/Client/${deactivateAccount.clientId}`)
        );

        // Use forkJoin for better performance
        forkJoin(clientRequests).subscribe({
          next: (clientDetails) => {
            console.log('Client details responses:', clientDetails);
            
            this.clients = deactivateAccounts.map((deactivateAccount, index) => {
              const clientDetail = clientDetails[index];
              
              const client = {
                id: deactivateAccount.id,
                clientId: deactivateAccount.clientId,
                nom: clientDetail?.nom || 'N/A',
                prenom: clientDetail?.prenom || 'N/A',
                email: deactivateAccount.email,
                statut: this.convertStatusToText(deactivateAccount.status)
              };
              
              console.log('Created client:', client.id, 'Status:', deactivateAccount.status, 'Converted to:', client.statut);
              return client;
            });
            
            console.log('Final clients array:', this.clients);
          },
          error: (err) => {
            console.error('Error fetching client details:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching deactivate accounts:', err);
      }
    });
  }

  private convertStatusToText(status: number): string {
    switch (status) {
      case 0: return 'En attente';
      case 1: return 'Approuvé';
      case 2: return 'Rejeté';
      default: return 'Inconnu';
    }
  }

  updateStatus(client: any, status: number) {
    this.http.put(
      `http://localhost:5082/api/DeactivateAccount/${client.id}/status`,
      { newStatus: status },
      {
        headers: {
          'Content-Type': 'application/json-patch+json',
          'Accept': '*/*'
        }
      }
    ).subscribe({
      next: (res) => {
        console.log('Status updated successfully:', res);
        client.statut = status === 1 ? 'Approuvé' : 'Rejeté';
      },
      error: (err) => {
        console.error('Failed to update status:', err);
      }
    });
  }

  approuver(client: any) {
    this.updateStatus(client, 1);
  }

  rejeter(client: any) {
    this.updateStatus(client, 2);
  }
} 