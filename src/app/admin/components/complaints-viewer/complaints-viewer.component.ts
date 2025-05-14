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
  templateUrl: './complaints-viewer.component.html',
  styleUrls: ['./complaints-viewer.component.scss']
})
export class ComplaintsViewerComponent implements OnInit {
  complaints: Complaint[] = [];
  filteredComplaints: Complaint[] = [];
  statusFilter: string = '';
  searchQuery: string = '';

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
    this.filteredComplaints = this.complaints.filter(complaint => {
      const matchesStatus = !this.statusFilter || complaint.status === this.statusFilter;
      const matchesSearch = !this.searchQuery || 
        complaint.clientName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        complaint.clientId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        complaint.subject.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  showMockDetails(complaint: Complaint) {
    console.log('Voir détails de la réclamation:', complaint);
    alert(`Détails de la Réclamation:\n\nClient: ${complaint.clientName}\nSujet: ${complaint.subject}\nDescription: ${complaint.description}\nStatut: ${complaint.status}\nDate de Soumission: ${complaint.submissionDate}\nDernière Mise à Jour: ${complaint.lastUpdated}`);
  }
} 