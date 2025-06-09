import { Component, OnInit } from '@angular/core';

interface DemandeChequier {
  id: number;
  reference: string;
  nom: string;
  cin: string;
  adresse: string;
  telephone: string;
  email: string;
  rib: string;
  agence: string;
  typeCompte: string;
  nombreChequiers: number;
  motif: string;
  motifAutre?: string;
  dateDemande: Date;
  statut: 'en_attente' | 'approuvé' | 'rejeté' | 'livré';
  dateTraitement?: Date;
  documents?: string[];
}

@Component({
  selector: 'app-chequier-management',
  templateUrl: './chequier-management.component.html',
  styleUrls: ['./chequier-management.component.scss']
})
export class ChequierManagementComponent implements OnInit {
  demandes: DemandeChequier[] = [];
  filteredDemandes: DemandeChequier[] = [];
  demandeSelectionnee?: DemandeChequier;
  statutFilter: string = '';
  searchQuery: string = '';

  ngOnInit(): void {
    this.chargerDemandes();
  }

  chargerDemandes(): void {
    // Ici vous devrez implémenter l'appel à votre service API
    // Pour l'exemple, nous utilisons des données mockées
    this.demandes = [
      {
        id: 1,
        reference: 'CHQ-2023-001',
        nom: 'Jean Dupont',
        cin: 'AB123456',
        adresse: '12 Rue des Fleurs, Casablanca',
        telephone: '0612345678',
        email: 'jean.dupont@email.com',
        rib: '007 780 123456789123 45',
        agence: 'Agence Centrale',
        typeCompte: 'courant',
        nombreChequiers: 2,
        motif: 'renouvellement',
        dateDemande: new Date('2023-05-15'),
        statut: 'en_attente'
      },
      // Ajoutez d'autres demandes mockées ici...
    ];
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredDemandes = this.demandes.filter(demande => {
      const matchesStatut = !this.statutFilter || demande.statut === this.statutFilter;
      const matchesSearch = !this.searchQuery || 
        demande.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        demande.cin.includes(this.searchQuery) ||
        demande.reference.includes(this.searchQuery);
      return matchesStatut && matchesSearch;
    });
  }

  getStatusText(statut: string): string {
    switch(statut) {
      case 'en_attente': return 'En attente';
      case 'approuvé': return 'Approuvé';
      case 'rejeté': return 'Rejeté';
      case 'livré': return 'Livré';
      default: return statut;
    }
  }

  voirDetails(demande: DemandeChequier): void {
    this.demandeSelectionnee = demande;
  }

  fermerModal(): void {
    this.demandeSelectionnee = undefined;
  }

  traiterDemande(demande: DemandeChequier, nouveauStatut: 'approuvé' | 'rejeté'): void {
    demande.statut = nouveauStatut;
    demande.dateTraitement = new Date();
    // Ici vous devrez ajouter l'appel API pour sauvegarder le changement
    this.applyFilters();
  }

  marquerCommeLivre(demande: DemandeChequier): void {
    demande.statut = 'livré';
    // Ici vous devrez ajouter l'appel API pour sauvegarder le changement
    this.applyFilters();
  }

  telechargerDocuments(demande: DemandeChequier): void {
    // Implémentez la logique de téléchargement des documents
    console.log('Téléchargement des documents pour', demande.reference);
  }
}