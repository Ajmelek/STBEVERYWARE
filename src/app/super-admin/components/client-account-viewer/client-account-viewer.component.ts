import { Component, OnInit } from '@angular/core';

interface ClientAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'actif' | 'inactif' | 'suspendu';
  registrationDate: string;
  lastLogin: string;
}

@Component({
  selector: 'app-client-account-viewer',
  template: `
    <div class="client-accounts-container">
      <h2>Comptes Clients</h2>
      <div class="filters">
        <input type="text" 
               [(ngModel)]="searchTerm" 
               (ngModelChange)="applyFilters()"
               placeholder="Rechercher par nom ou email...">
        <select [(ngModel)]="statusFilter" (ngModelChange)="applyFilters()">
          <option value="">Tous les Statuts</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
          <option value="suspendu">Suspendu</option>
        </select>
      </div>
      <div class="accounts-list">
        <table>
          <thead>
            <tr>
              <th>ID Client</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Statut</th>
              <th>Date d'Inscription</th>
              <th>Dernière Connexion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let account of filteredAccounts">
              <td>{{ account.id }}</td>
              <td>{{ account.name }}</td>
              <td>{{ account.email }}</td>
              <td>{{ account.phone }}</td>
              <td>
                <span [class]="'status-' + account.status">
                  {{ account.status }}
                </span>
              </td>
              <td>{{ account.registrationDate | date }}</td>
              <td>{{ account.lastLogin | date }}</td>
              <td>
                <button (click)="showMockDetails(account)"
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
    .client-accounts-container {
      padding: 20px;
    }
    .filters {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
    }
    input, select {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    input {
      flex: 1;
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
    .status-actif {
      color: #5cb85c;
    }
    .status-inactif {
      color: #f0ad4e;
    }
    .status-suspendu {
      color: #d9534f;
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
export class ClientAccountViewerComponent implements OnInit {
  accounts: ClientAccount[] = [];
  filteredAccounts: ClientAccount[] = [];
  searchTerm: string = '';
  statusFilter: string = '';

  ngOnInit() {
    // Mock data
    this.accounts = [
      {
        id: 'CLI001',
        name: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        phone: '+33123456789',
        status: 'actif',
        registrationDate: '2024-01-15',
        lastLogin: '2024-03-16'
      },
      {
        id: 'CLI002',
        name: 'Marie Martin',
        email: 'marie.martin@email.com',
        phone: '+33678901234',
        status: 'inactif',
        registrationDate: '2024-02-01',
        lastLogin: '2024-03-10'
      },
      {
        id: 'CLI003',
        name: 'Pierre Durand',
        email: 'pierre.durand@email.com',
        phone: '+33789012345',
        status: 'suspendu',
        registrationDate: '2024-01-20',
        lastLogin: '2024-03-05'
      },
      {
        id: 'CLI004',
        name: 'Sophie Bernard',
        email: 'sophie.bernard@email.com',
        phone: '+33890123456',
        status: 'actif',
        registrationDate: '2024-02-15',
        lastLogin: '2024-03-16'
      }
    ];
    this.applyFilters();
  }

  applyFilters() {
    this.filteredAccounts = this.accounts.filter(account => {
      const matchesSearch = !this.searchTerm || 
        account.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || 
        account.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  showMockDetails(account: ClientAccount) {
    console.log('Voir détails du compte:', account);
    alert(`Détails du Compte:\n\nID Client: ${account.id}\nNom: ${account.name}\nEmail: ${account.email}\nTéléphone: ${account.phone}\nStatut: ${account.status}\nDate d'Inscription: ${account.registrationDate}\nDernière Connexion: ${account.lastLogin}`);
  }
} 