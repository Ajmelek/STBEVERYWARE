import { Component, OnInit } from '@angular/core';

interface Complaint {
  id: number;
  clientId: string;
  clientName: string;
  subject: string;
  description: string;
  status: 'ouverte' | 'en cours' | 'résolue';
  submissionDate: string;
  lastUpdated: string;
}

@Component({
  selector: 'app-complaints-viewer',
  template: `
    <div class="complaints-container">
      <h2>Gestion des Réclamations</h2>
      <div class="filters">
        <select [(ngModel)]="statusFilter" (ngModelChange)="applyFilters()">
          <option value="">Tous les Statuts</option>
          <option value="ouverte">Ouverte</option>
          <option value="en cours">En Cours</option>
          <option value="résolue">Résolue</option>
        </select>
      </div>
      <div class="complaints-list">
        <table>
          <thead>
            <tr>
              <th>ID Client</th>
              <th>Nom du Client</th>
              <th>Sujet</th>
              <th>Statut</th>
              <th>Date de Soumission</th>
              <th>Dernière Mise à Jour</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let complaint of filteredComplaints">
              <td>{{ complaint.clientId }}</td>
              <td>{{ complaint.clientName }}</td>
              <td>{{ complaint.subject }}</td>
              <td>
                <span [class]="'status-' + complaint.status">
                  {{ complaint.status }}
                </span>
              </td>
              <td>{{ complaint.submissionDate | date }}</td>
              <td>{{ complaint.lastUpdated | date }}</td>
              <td>
                <button (click)="showMockDetails(complaint)"
                        class="btn-view">
                  Voir Détails
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .complaints-container {
      padding: 20px;
    }
    .filters {
      margin-bottom: 20px;
    }
    select {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f5f5f5;
    }
    .status-ouverte {
      color: #d9534f;
    }
    .status-en-cours {
      color: #f0ad4e;
    }
    .status-résolue {
      color: #5cb85c;
    }
    .btn-view {
      background-color: #5bc0de;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class ComplaintsViewerComponent implements OnInit {
  complaints: Complaint[] = [];
  filteredComplaints: Complaint[] = [];
  statusFilter: string = '';

  ngOnInit() {
    // Mock data
    this.complaints = [
      {
        id: 1,
        clientId: 'CLI001',
        clientName: 'Jean Dupont',
        subject: 'Problème de connexion',
        description: 'Impossible de se connecter à mon compte depuis hier',
        status: 'ouverte',
        submissionDate: '2024-03-15',
        lastUpdated: '2024-03-15'
      },
      {
        id: 2,
        clientId: 'CLI002',
        clientName: 'Marie Martin',
        subject: 'Question sur le service',
        description: 'Besoin d\'informations sur les nouvelles fonctionnalités',
        status: 'en cours',
        submissionDate: '2024-03-14',
        lastUpdated: '2024-03-16'
      },
      {
        id: 3,
        clientId: 'CLI003',
        clientName: 'Pierre Durand',
        subject: 'Problème de paiement',
        description: 'Transaction échouée lors du dernier paiement',
        status: 'résolue',
        submissionDate: '2024-03-13',
        lastUpdated: '2024-03-15'
      },
      {
        id: 4,
        clientId: 'CLI004',
        clientName: 'Sophie Bernard',
        subject: 'Mise à jour du profil',
        description: 'Impossible de modifier mes informations personnelles',
        status: 'ouverte',
        submissionDate: '2024-03-16',
        lastUpdated: '2024-03-16'
      }
    ];
    this.applyFilters();
  }

  applyFilters() {
    this.filteredComplaints = this.complaints.filter(complaint => 
      !this.statusFilter || complaint.status === this.statusFilter
    );
  }

  showMockDetails(complaint: Complaint) {
    console.log('Voir détails de la réclamation:', complaint);
    alert(`Détails de la Réclamation:\n\nClient: ${complaint.clientName}\nSujet: ${complaint.subject}\nDescription: ${complaint.description}\nStatut: ${complaint.status}\nDate de Soumission: ${complaint.submissionDate}\nDernière Mise à Jour: ${complaint.lastUpdated}`);
  }
} 