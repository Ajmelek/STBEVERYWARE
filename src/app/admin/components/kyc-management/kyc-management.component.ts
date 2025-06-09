import { Component, OnInit } from '@angular/core';

interface KycSubmission {
  id: number;
  clientId: string;
  clientName: string;
  status: 'en attente' | 'approuvé' | 'rejeté';
  submissionDate: string;
  documents: string[];
  details?: {
    civilite?: string;
    prenom?: string;
    nom?: string;
    cin?: string;
    dateDelivrance?: string;
    sigNature?: string;
  };
}

@Component({
  selector: 'app-kyc-management',
  templateUrl: './kyc-management.component.html',
  styleUrls: ['./kyc-management.component.scss']
})
export class KycManagementComponent implements OnInit {
  submissions: KycSubmission[] = [];
  filteredSubmissions: KycSubmission[] = [];
  statusFilter: string = '';
  searchQuery: string = '';
  selectedSubmission: KycSubmission | null = null;
  adminComment: string = '';
  viewComment: string = '';
  showModal: boolean = false;

  ngOnInit() {
    this.loadSubmissions();
  }

  loadSubmissions() {
    this.submissions = [
      {
        id: 1,
        clientId: 'CLI001',
        clientName: 'Jean Dupont',
        status: 'en attente',
        submissionDate: '2024-03-15',
        documents: ['Carte d\'identité', 'Justificatif de domicile'],
        details: {
          civilite: 'Monsieur',
          prenom: 'Jean',
          nom: 'Dupont',
          cin: '12345678',
          dateDelivrance: '2020-05-10',
          sigNature: 'assets/signatures/signature1.png'
        }
      },
      {
        id: 2,
        clientId: 'CLI002',
        clientName: 'Marie Martin',
        status: 'approuvé',
        submissionDate: '2024-03-14',
        documents: ['Passeport', 'Relevé bancaire'],
        details: {
          civilite: 'Madame',
          prenom: 'Marie',
          nom: 'Martin',
          cin: '87654321',
          dateDelivrance: '2019-11-22',
          sigNature: 'assets/signatures/signature2.png'
        }
      },
      {
        id: 3,
        clientId: 'CLI003',
        clientName: 'Pierre Lambert',
        status: 'en attente',
        submissionDate: '2024-03-16',
        documents: ['Permis de conduire', 'Facture EDF'],
        details: {
          civilite: 'Monsieur',
          prenom: 'Pierre',
          nom: 'Lambert',
          cin: '13579246',
          dateDelivrance: '2021-02-15'
        }
      }
    ];
    this.applyFilters();
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
    console.warn('Signature image failed to load');
  }

  applyFilters() {
    this.filteredSubmissions = this.submissions.filter(submission => {
      const matchesStatus = !this.statusFilter || submission.status === this.statusFilter;
      const matchesSearch = !this.searchQuery || 
        submission.clientName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        submission.clientId.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  getStatusLabel(status: string): string {
    switch(status) {
      case 'en attente': return 'En Attente';
      case 'approuvé': return 'Approuvé';
      case 'rejeté': return 'Rejeté';
      default: return status;
    }
  }

  viewDetails(submission: KycSubmission) {
    this.selectedSubmission = submission;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedSubmission = null;
    this.adminComment = '';
    this.viewComment = '';
  }

  approveSubmission(submissionId: number) {
    const submission = this.submissions.find(s => s.id === submissionId);
    if (submission) {
      submission.status = 'approuvé';
      this.applyFilters();
      alert(`La soumission de ${submission.clientName} a été approuvée.`);
    }
  }

  rejectSubmission(submissionId: number) {
    const submission = this.submissions.find(s => s.id === submissionId);
    if (submission) {
      submission.status = 'rejeté';
      this.applyFilters();
      alert(`La soumission de ${submission.clientName} a été rejetée.`);
    }
  }

  approveWithComment() {
    if (this.selectedSubmission) {
      this.selectedSubmission.status = 'approuvé';
      if (this.adminComment) {
        console.log('Commentaire admin:', this.adminComment);
      }
      this.applyFilters();
      this.closeModal();
      alert(`La soumission a été approuvée avec succès.\nCommentaire: ${this.adminComment || 'Aucun commentaire'}`);
    }
  }

  rejectWithComment() {
    if (this.selectedSubmission) {
      this.selectedSubmission.status = 'rejeté';
      if (this.adminComment) {
        console.log('Commentaire admin:', this.adminComment);
      }
      this.applyFilters();
      this.closeModal();
      alert(`La soumission a été rejetée avec succès.\nCommentaire: ${this.adminComment || 'Aucun commentaire'}`);
    }
  }

  confirmView() {
    if (this.selectedSubmission) {
      if (this.viewComment) {
        console.log('Commentaire de visualisation:', this.viewComment);
      }
      this.applyFilters();
      this.closeModal();
      alert(`La soumission de ${this.selectedSubmission.clientName} a été visualisée.\nCommentaire: ${this.viewComment || 'Aucun commentaire'}`);
    }
  }

  downloadDocument(docName: string) {
    alert(`Téléchargement simulé du document: ${docName}`);
  }
}