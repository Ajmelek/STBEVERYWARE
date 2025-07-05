import { Component, OnInit } from '@angular/core';
import { ReclamationService, Reclamation } from '../../../services/reclamation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app- ',
  templateUrl: './complaints-viewer.component.html',
  styleUrls: ['./complaints-viewer.component.scss']
})
export class ComplaintsViewerComponent implements OnInit {
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
      error: (err: Error) => {
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
      case 3: return 'Rejeté';
      default: return 'Inconnu';
    }
  }

  getStatusClass(etat: number): string {
    switch (etat) {
      case 0: return 'pending';
      case 1: return 'in-progress';
      case 2: return 'resolved';
      case 3: return 'rejected';
      default: return '';
    }
  }

  updateStatus(reclamation: Reclamation, newEtat: number): void {
    this.reclamationService.updateStatus(reclamation.id, newEtat).subscribe({
      next: () => {
        // Update the local state after successful API call
        reclamation.etat = newEtat;
      },
      error: (err: Error) => {
        console.error('Error updating reclamation status:', err);
        // You might want to show an error message to the user here
      }
    });
  }
} 