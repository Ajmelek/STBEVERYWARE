import { Component, OnInit } from '@angular/core';

interface Client {
  id: number;
  clientId: string;
  nom: string;
  prenom: string;
  email: string;
  status: 'actif' | 'inactif' | 'bloqué';
  dateCreation: string;
  derniereConnexion: string;
}

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.scss']
})
export class ClientManagementComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  statusFilter: string = '';
  searchQuery: string = '';

  ngOnInit() {
    // Mock data
    this.clients = [
      {
        id: 1,
        clientId: 'CLI001',
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@email.com',
        status: 'actif',
        dateCreation: '2024-01-15',
        derniereConnexion: '2024-03-16'
      },
      {
        id: 2,
        clientId: 'CLI002',
        nom: 'Martin',
        prenom: 'Marie',
        email: 'marie.martin@email.com',
        status: 'inactif',
        dateCreation: '2024-02-01',
        derniereConnexion: '2024-03-10'
      },
      {
        id: 3,
        clientId: 'CLI003',
        nom: 'Durand',
        prenom: 'Pierre',
        email: 'pierre.durand@email.com',
        status: 'bloqué',
        dateCreation: '2024-01-20',
        derniereConnexion: '2024-03-05'
      },
      {
        id: 4,
        clientId: 'CLI004',
        nom: 'Bernard',
        prenom: 'Sophie',
        email: 'sophie.bernard@email.com',
        status: 'actif',
        dateCreation: '2024-02-15',
        derniereConnexion: '2024-03-16'
      }
    ];
    this.applyFilters();
  }

  applyFilters() {
    this.filteredClients = this.clients.filter(client => {
      const matchesStatus = !this.statusFilter || client.status === this.statusFilter;
      const matchesSearch = !this.searchQuery || 
        client.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        client.prenom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        client.clientId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  showMockAction(action: string, client: Client) {
    console.log(`Action simulée ${action} pour le client:`, client);
    alert(`Ceci est une action simulée ${action} pour le client ${client.prenom} ${client.nom}.`);
  }
} 