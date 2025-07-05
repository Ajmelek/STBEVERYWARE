import { Component, OnInit } from '@angular/core';
import { DemandeCarteBancaireService, DemandeDeCarteBancaire } from '../../../services/demande-carte-bancaire.service';

@Component({
  selector: 'app-carte-bancaire-management',
  templateUrl: './carte-bancaire-management.component.html',
  styleUrls: ['./carte-bancaire-management.component.scss']
})
export class CarteBancaireManagementComponent implements OnInit {
  demandes: DemandeDeCarteBancaire[] = [];
  filteredDemandes: DemandeDeCarteBancaire[] = [];
  statusFilter: string = '';
  searchQuery: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private demandeService: DemandeCarteBancaireService) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.demandeService.getAllDemandes().subscribe({
      next: (data) => {
        this.demandes = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading demandes:', error);
        this.errorMessage = 'Erreur lors du chargement des demandes';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredDemandes = this.demandes.filter(demande => {
      const matchesStatus = !this.statusFilter || this.getEtatText(demande.etat) === this.statusFilter;
      const matchesSearch = !this.searchQuery || 
        demande.clientId.toString().includes(this.searchQuery) ||
        demande.telephone.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        demande.adresseEmail.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        demande.typeDeCarte.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  getEtatText(etat: number): string {
    switch (etat) {
      case 0: return 'En Attente';
      case 1: return 'Approuvé';
      case 2: return 'Rejeté';
      default: return 'Inconnu';
    }
  }

  getEtatClass(etat: number): string {
    switch (etat) {
      case 0: return 'status-pending';
      case 1: return 'status-approved';
      case 2: return 'status-rejected';
      default: return '';
    }
  }

  updateDemandeStatus(demande: DemandeDeCarteBancaire, newEtat: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    this.demandeService.updateStatus(demande.id, newEtat).subscribe({
      next: () => {
        demande.etat = newEtat;
    this.applyFilters();
        this.loading = false;
        this.successMessage = `Statut mis à jour avec succès: ${this.getEtatText(newEtat)}`;
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Error updating status:', error);
        this.errorMessage = 'Erreur lors de la mise à jour du statut';
        this.loading = false;
        // Clear error message after 3 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

  viewDemandeDetails(demande: DemandeDeCarteBancaire): void {
    console.log('Viewing demande details:', demande);
    // You can implement a modal or detailed view here if needed
  }
}