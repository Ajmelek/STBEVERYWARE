import { Component, OnInit } from '@angular/core';
import { ReclamationService, Reclamation } from '../../services/reclamation.service';

@Component({
  selector: 'app-reclamation-management',
  templateUrl: './reclamation-management.component.html',
  styleUrls: ['./reclamation-management.component.scss']
})
export class ReclamationManagementComponent implements OnInit {
  reclamations: Reclamation[] = [];
  loading = true;
  error: string | null = null;

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.loading = true;
    this.error = null;
    
    this.reclamationService.getReclamations().subscribe({
      next: (reclamations) => {
        this.reclamations = reclamations;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load reclamations. Please try again later.';
        this.loading = false;
        console.error('Error loading reclamations:', err);
      }
    });
  }

  getStatusText(etat: number): string {
    switch (etat) {
      case 0: return 'En attente';
      case 1: return 'En cours';
      case 2: return 'Résolue';
      default: return 'Inconnu';
    }
  }

  getStatusClass(etat: number): string {
    switch (etat) {
      case 0: return 'pending';
      case 1: return 'in-progress';
      case 2: return 'resolved';
      default: return '';
    }
  }

  updateStatus(id: number, etat: number): void {
    this.reclamationService.updateStatus(id, etat).subscribe({
      next: () => {
        // Update the local state after successful API call
        const reclamation = this.reclamations.find(r => r.id === id);
        if (reclamation) {
          reclamation.etat = etat;
        }
      },
      error: (err) => {
        console.error('Error updating reclamation status:', err);
        // You might want to show an error message to the user here
      }
    });
  }
} 