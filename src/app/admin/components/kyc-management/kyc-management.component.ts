import { Component, OnInit } from '@angular/core';

interface KycSubmission {
  id: number;
  clientId: string;
  clientName: string;
  status: 'en attente' | 'approuvé' | 'rejeté';
  submissionDate: string;
  documents: string[];
}

@Component({
  selector: 'app-kyc-management',
  template: `
    <div class="kyc-container">
      <h2>Soumissions KYC</h2>
      <div class="submissions-list">
        <table>
          <thead>
            <tr>
              <th>ID Client</th>
              <th>Nom du Client</th>
              <th>Date de Soumission</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let submission of submissions">
              <td>{{ submission.clientId }}</td>
              <td>{{ submission.clientName }}</td>
              <td>{{ submission.submissionDate | date }}</td>
              <td>
                <span [class]="'status-' + submission.status">
                  {{ submission.status }}
                </span>
              </td>
              <td>
                <button *ngIf="submission.status === 'en attente'"
                        (click)="showMockAction('approuver', submission)"
                        class="btn-approve">
                  Approuver
                </button>
                <button *ngIf="submission.status === 'en attente'"
                        (click)="showMockAction('rejeter', submission)"
                        class="btn-reject">
                  Rejeter
                </button>
                <button (click)="showMockAction('voir', submission)"
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
    .kyc-container {
      padding: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f5f5f5;
    }
    .status-en-attente {
      color: #f0ad4e;
    }
    .status-approuvé {
      color: #5cb85c;
    }
    .status-rejeté {
      color: #d9534f;
    }
    button {
      margin: 0 5px;
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-approve {
      background-color: #5cb85c;
      color: white;
    }
    .btn-reject {
      background-color: #d9534f;
      color: white;
    }
    .btn-view {
      background-color: #5bc0de;
      color: white;
    }
  `]
})
export class KycManagementComponent implements OnInit {
  submissions: KycSubmission[] = [];

  ngOnInit() {
    // Mock data
    this.submissions = [
      {
        id: 1,
        clientId: 'CLI001',
        clientName: 'Jean Dupont',
        status: 'en attente',
        submissionDate: '2024-03-15',
        documents: ['Carte d\'identité', 'Justificatif de domicile']
      },
      {
        id: 2,
        clientId: 'CLI002',
        clientName: 'Marie Martin',
        status: 'approuvé',
        submissionDate: '2024-03-14',
        documents: ['Passeport', 'Relevé bancaire']
      },
      {
        id: 3,
        clientId: 'CLI003',
        clientName: 'Pierre Durand',
        status: 'rejeté',
        submissionDate: '2024-03-13',
        documents: ['Carte d\'identité', 'Facture d\'électricité']
      },
      {
        id: 4,
        clientId: 'CLI004',
        clientName: 'Sophie Bernard',
        status: 'en attente',
        submissionDate: '2024-03-16',
        documents: ['Passeport', 'Justificatif de domicile']
      }
    ];
  }

  showMockAction(action: string, submission: KycSubmission) {
    console.log(`Action simulée ${action} pour la soumission:`, submission);
    alert(`Ceci est une action simulée ${action} pour la soumission de ${submission.clientName}.`);
  }
} 