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
  templateUrl: './kyc-management.component.html',
  styleUrls: ['./kyc-management.component.scss']
})
export class KycManagementComponent implements OnInit {
  submissions: KycSubmission[] = [];
  filteredSubmissions: KycSubmission[] = [];
  statusFilter: string = '';
  searchQuery: string = '';

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
    this.applyFilters();
  }

  applyFilters() {
    this.filteredSubmissions = this.submissions.filter(submission => {
      const matchesStatus = !this.statusFilter || submission.status === this.statusFilter;
      const matchesSearch = !this.searchQuery || 
        submission.clientName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        submission.clientId.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  showMockAction(action: string, submission: KycSubmission) {
    console.log(`Action simulée ${action} pour la soumission:`, submission);
    alert(`Ceci est une action simulée ${action} pour la soumission de ${submission.clientName}.`);
  }
} 