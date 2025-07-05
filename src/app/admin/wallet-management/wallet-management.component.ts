import { Component, OnInit } from '@angular/core';
import { WalletService, WalletDemand } from '../../services/wallet.service';

interface WalletDemande {
  id: number;
  clientId: number;
  clientName: string;
  phoneNumber: string;
  email: string;
  etat: number;
}

interface Wallet {
  id: number;
  walletId: string;
  address: string;
  owner: string;
  balance: number;
  status: 'actif' | 'suspendu' | 'bloqué';
  lastActivity: Date;
}

@Component({
  selector: 'app-wallet-management',
  templateUrl: './wallet-management.component.html',
  styleUrls: ['./wallet-management.component.scss']
})
export class WalletManagementComponent implements OnInit {
  walletDemands: WalletDemand[] = [];
  loading = true;
  error: string | null = null;
  successMessage: string = '';
  searchQuery: string = '';
  statusFilter: string = '';

  // Existing wallet management section
  wallets: Wallet[] = [];
  filteredWallets: Wallet[] = [];

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.loadWalletDemands();

    // Mock data for existing wallets
    this.wallets = [
      {
        id: 1,
        walletId: 'W1001',
        address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        owner: 'Jean Dupont',
        balance: 1250.50,
        status: 'actif',
        lastActivity: new Date('2024-03-15')
      },
      {
        id: 2,
        walletId: 'W1002',
        address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
        owner: 'Marie Martin',
        balance: 3200.00,
        status: 'suspendu',
        lastActivity: new Date('2024-03-14')
      },
      {
        id: 3,
        walletId: 'W1003',
        address: '0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB',
        owner: 'Pierre Durand',
        balance: 500.75,
        status: 'bloqué',
        lastActivity: new Date('2024-03-13')
      },
      {
        id: 4,
        walletId: 'W1004',
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        owner: 'Sophie Bernard',
        balance: 0.00,
        status: 'actif',
        lastActivity: new Date('2024-03-16')
      }
    ];
    this.applyFilters();
  }

  loadWalletDemands(): void {
    this.loading = true;
    this.error = null;
    this.successMessage = '';
    
    this.walletService.getWalletDemands().subscribe({
      next: (demands) => {
        this.walletDemands = demands;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load wallet demands. Please try again later.';
        this.loading = false;
        console.error('Error loading wallet demands:', err);
      }
    });
  }

  getStatusText(etat: number): string {
    switch (etat) {
      case 0: return 'En Attente';
      case 1: return 'Approuvé';
      case 2: return 'Rejeté';
      default: return 'Unknown';
    }
  }

  getStatusClass(etat: number): string {
    switch (etat) {
      case 0: return 'En_attente';
      case 1: return 'Approuver';
      case 2: return 'Rejeter';
      default: return '';
    }
  }

  updateStatus(id: number, etat: number): void {
    this.loading = true;
    this.error = null;
    this.successMessage = '';
    
    this.walletService.updateStatus(id, etat).subscribe({
      next: () => {
        // Update the local state after successful API call
        const demand = this.walletDemands.find(d => d.id === id);
        if (demand) {
          demand.etat = etat;
        }
        this.loading = false;
        this.successMessage = `Statut mis à jour avec succès: ${this.getStatusText(etat)}`;
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error('Error updating wallet status:', err);
        this.error = 'Erreur lors de la mise à jour du statut';
        this.loading = false;
        // Clear error message after 3 seconds
        setTimeout(() => {
          this.error = null;
        }, 3000);
      }
    });
  }

  viewDemandeDetails(demand: WalletDemand): void {
    console.log('Viewing demande details:', demand);
    // You can implement a modal or detailed view here if needed
  }

  // Existing wallet management methods
  applyFilters() {
    this.filteredWallets = this.wallets.filter(wallet => {
      const matchesStatus = !this.statusFilter || wallet.status === this.statusFilter;
      const matchesSearch = !this.searchQuery || 
        wallet.owner.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        wallet.walletId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        wallet.address.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  updateWalletStatus(wallet: Wallet, newStatus: 'actif' | 'suspendu' | 'bloqué') {
    wallet.status = newStatus;
    this.applyFilters();
    console.log(`Wallet ${wallet.walletId} status updated to ${newStatus}`);
  }

  viewWalletDetails(wallet: Wallet) {
    console.log('Viewing wallet details:', wallet);
    alert(`Détails du portefeuille:\n\nID: ${wallet.walletId}\nPropriétaire: ${wallet.owner}\nSolde: ${wallet.balance} €\nStatut: ${wallet.status}`);
  }
}