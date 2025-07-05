import { Component, OnInit } from '@angular/core';
import { DemandeChequierService } from '../../services/demande-chequier.service';
import { DemandeDeChequier } from '../../../admin/models/demande-chequier.model';

@Component({
  selector: 'app-chequier-management',
  templateUrl: './chequier-management.component.html',
  styleUrls: ['./chequier-management.component.scss']
})
export class ChequierManagementComponent implements OnInit {
  demandes: DemandeDeChequier[] = [];
  filteredDemandes: DemandeDeChequier[] = [];
  loading = false;
  errorMessage = '';
  searchQuery = '';
  statutFilter = '';
  demandeSelectionnee: DemandeDeChequier | null = null;

  constructor(private demandeChequierService: DemandeChequierService) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    this.loading = true;
    this.errorMessage = '';
    this.demandeChequierService.getDemandes().subscribe({
      next: (data) => {
        this.demandes = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des demandes. Veuillez réessayer.';
        this.loading = false;
        console.error('Error loading demandes:', error);
      }
    });
  }

  applyFilters(): void {
    this.filteredDemandes = this.demandes.filter(demande => {
      const matchesSearch = !this.searchQuery || 
        demande.client.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        demande.client.prenom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        demande.telephone.includes(this.searchQuery) ||
        demande.adresseEmail.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus = !this.statutFilter || 
        (this.statutFilter === 'en_attente' && demande.etat === 0) ||
        (this.statutFilter === 'approuvé' && demande.etat === 1) ||
        (this.statutFilter === 'rejeté' && demande.etat === 2);

      return matchesSearch && matchesStatus;
    });
  }

  getStatusText(etat: number): string {
    switch (etat) {
      case 0:
        return 'En Attente';
      case 1:
        return 'Approuvé';
      case 2:
        return 'Rejeté';
      default:
        return 'Inconnu';
    }
  }

  traiterDemande(demande: DemandeDeChequier, action: 'approuvé' | 'rejeté'): void {
    const newEtat = action === 'approuvé' ? 1 : 2;
    
    this.loading = true;
    this.errorMessage = '';

    this.demandeChequierService.updateStatus(demande.id, newEtat).subscribe({
      next: () => {
        // Update the local state
        demande.etat = newEtat;
        this.applyFilters();
        this.loading = false;
        
        // Close modal if open
        if (this.demandeSelectionnee?.id === demande.id) {
          this.fermerModal();
        }
      },
      error: (error) => {
        this.errorMessage = `Erreur lors de la mise à jour du statut. Veuillez réessayer.`;
        this.loading = false;
        console.error('Error updating status:', error);
      }
    });
  }

  voirDetails(demande: DemandeDeChequier): void {
    this.demandeSelectionnee = demande;
  }

  fermerModal(): void {
    this.demandeSelectionnee = null;
  }
}