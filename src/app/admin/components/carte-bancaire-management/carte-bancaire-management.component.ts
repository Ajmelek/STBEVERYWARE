import { Component, OnInit } from '@angular/core';

interface BankCard {
  id: number;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  status: 'active' | 'suspended' | 'expired';
  balance: number;
  lastTransaction: Date;
}

@Component({
  selector: 'app-carte-bancaire-management',
  templateUrl: './carte-bancaire-management.component.html',
  styleUrls: ['./carte-bancaire-management.component.scss']
})
export class CarteBancaireManagementComponent implements OnInit {
  bankCards: BankCard[] = [];
  filteredCards: BankCard[] = [];
  statusFilter: string = '';
  searchQuery: string = '';

  ngOnInit(): void {
    this.loadMockData();
    this.applyFilters();
  }

  private loadMockData(): void {
    this.bankCards = [
      {
        id: 1,
        cardNumber: '**** **** **** 1234',
        cardHolder: 'Jean Dupont',
        expiryDate: '12/25',
        status: 'active',
        balance: 1250.50,
        lastTransaction: new Date('2024-03-15')
      },
      {
        id: 2,
        cardNumber: '**** **** **** 5678',
        cardHolder: 'Marie Martin',
        expiryDate: '06/24',
        status: 'suspended',
        balance: 3200.00,
        lastTransaction: new Date('2024-03-14')
      },
      {
        id: 3,
        cardNumber: '**** **** **** 9012',
        cardHolder: 'Pierre Durand',
        expiryDate: '03/23',
        status: 'expired',
        balance: 500.75,
        lastTransaction: new Date('2024-03-13')
      },
      {
        id: 4,
        cardNumber: '**** **** **** 3456',
        cardHolder: 'Sophie Bernard',
        expiryDate: '09/26',
        status: 'active',
        balance: 0.00,
        lastTransaction: new Date('2024-03-16')
      }
    ];
  }

  applyFilters(): void {
    this.filteredCards = this.bankCards.filter(card => {
      const matchesStatus = !this.statusFilter || card.status === this.statusFilter;
      const matchesSearch = !this.searchQuery || 
        card.cardHolder.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        card.cardNumber.includes(this.searchQuery);
      return matchesStatus && matchesSearch;
    });
  }

  updateCardStatus(card: BankCard, newStatus: 'active' | 'suspended' | 'expired'): void {
    card.status = newStatus;
    this.applyFilters();
    console.log(`Card ${card.cardNumber} status updated to ${newStatus}`);
  }

  viewCardDetails(card: BankCard): void {
    console.log('Viewing card details:', card);
    alert(`Détails de la carte:\n\nNuméro: ${card.cardNumber}\nTitulaire: ${card.cardHolder}\nExpiration: ${card.expiryDate}\nSolde: ${card.balance} €\nStatut: ${card.status}`);
  }
}