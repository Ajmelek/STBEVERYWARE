import { Component, OnInit } from '@angular/core';
import { ClientManagementService, Client } from '../../services/client-management.service';

@Component({
  selector: 'app-super-admin-client-management',
  templateUrl: './super-admin-client-management.component.html',
  styleUrls: ['./super-admin-client-management.component.scss']
})
export class SuperAdminClientManagementComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  selectedClient: Client | null = null;
  showDetailView = false;
  isLoading = false;
  error: string | null = null;
  searchQuery: string = '';

  constructor(private clientService: ClientManagementService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.isLoading = true;
    this.error = null;
    
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des clients';
        this.isLoading = false;
        console.error('Error loading clients:', err);
      }
    });
  }

  applyFilters() {
    this.filteredClients = this.clients.filter(client => {
      const matchesSearch = !this.searchQuery || 
        (client.nom && client.nom.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (client.prenom && client.prenom.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (client.id && client.id.toString().includes(this.searchQuery)) ||
        (client.mailPrincipal && client.mailPrincipal.toLowerCase().includes(this.searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }

  getFullName(client: Client): string {
    const nom = client.nom || '';
    const prenom = client.prenom || '';
    
    if (nom && prenom) {
      return `${nom} ${prenom}`;
    } else if (nom) {
      return nom;
    } else if (prenom) {
      return prenom;
    } else {
      return 'N/A';
    }
  }

  viewClientDetails(client: Client) {
    this.selectedClient = client;
    this.showDetailView = true;
  }

  closeDetailView() {
    this.showDetailView = false;
    this.selectedClient = null;
  }

  getClientStatus(client: Client): string {
    // You can implement your own logic to determine client status
    // For now, we'll use a simple approach based on available data
    if (client.mailPrincipal && client.nom && client.prenom) {
      return 'Actif';
    }
    return 'Inactif';
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'actif':
        return 'status-active';
      case 'inactif':
        return 'status-inactive';
      case 'bloqué':
        return 'status-blocked';
      default:
        return 'status-inactive';
    }
  }
} 