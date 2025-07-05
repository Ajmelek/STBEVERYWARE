import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  selectedSubmission: any = null;
  adminComment: string = '';
  viewComment: string = '';
  showModal: boolean = false;
  loading: boolean = false;
  error: string | null = null;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadSubmissions();
  }

  loadSubmissions() {
    this.loading = true;
    this.error = null;
    this.http.get<any>('http://localhost:5082/api/Demande/GetAllDemandes').subscribe({
      next: (response) => {
        const data = response && response.data ? response.data : [];
        this.submissions = data.map((item: any) => {
          // Map status from etat
          let status: 'en attente' | 'approuvé' | 'rejeté' = 'en attente';
          if (item.etat === 1) status = 'approuvé';
          else if (item.etat === 2) status = 'rejeté';
          // Map clientName from prenom + nom if not present
          let clientName = (item.prenom || '') + (item.nom ? ' ' + item.nom : '');
          if (!clientName.trim()) clientName = 'Non fourni';
          // Documents array
          const documents = [];
          if (item.documentCIN) documents.push('CIN: ' + (item.documentCINOriginalName || item.documentCIN));
          if (item.documentJustificatif) documents.push('Justificatif: ' + (item.documentJustificatifOriginalName || item.documentJustificatif));
          // Details for modal
          const details = {
            civilite: item.civilite,
            prenom: item.prenom,
            nom: item.nom,
            cin: item.cin,
            dateDelivrance: item.datedelivrance,
            sigNature: item.signaturePath
          };
          // Attach original object for full details
          const mapped = {
            id: item.id,
            clientId: item.clientID ? String(item.clientID) : '',
            clientName,
            status,
            submissionDate: item.dateDemande,
            documents,
            details,
            _original: item
          };
          return mapped;
        });
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des soumissions KYC.';
        this.loading = false;
        this.submissions = [];
        this.filteredSubmissions = [];
        console.error('Erreur API KYC:', err);
      }
    });
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

  viewDetails(submission: any) {
    this.selectedSubmission = submission._original || submission;
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
      // Make API call to approve the demande
      this.http.post(`http://localhost:5082/api/Demande/ApproveDemande/${submissionId}`, {}).subscribe({
        next: (response) => {
          submission.status = 'approuvé';
          this.applyFilters();
          alert(`La soumission de ${submission.clientName} a été approuvée.`);
        },
        error: (error) => {
          console.error('Erreur lors de l\'approbation:', error);
          alert(`Erreur lors de l'approbation de la soumission de ${submission.clientName}.`);
        }
      });
    }
  }

  rejectSubmission(submissionId: number) {
    const submission = this.submissions.find(s => s.id === submissionId);
    if (submission) {
      // Make API call to reject the demande
      this.http.post(`http://localhost:5082/api/Demande/RejectDemande/${submissionId}`, {}).subscribe({
        next: (response) => {
          submission.status = 'rejeté';
          this.applyFilters();
          alert(`La soumission de ${submission.clientName} a été rejetée.`);
        },
        error: (error) => {
          console.error('Erreur lors du rejet:', error);
          alert(`Erreur lors du rejet de la soumission de ${submission.clientName}.`);
        }
      });
    }
  }

  approveWithComment() {
    if (this.selectedSubmission) {
      // Make API call to approve the demande
      this.http.post(`http://localhost:5082/api/Demande/ApproveDemande/${this.selectedSubmission.id}`, {}).subscribe({
        next: (response) => {
          this.selectedSubmission.status = 'approuvé';
          if (this.adminComment) {
            console.log('Commentaire admin:', this.adminComment);
          }
          this.applyFilters();
          this.closeModal();
          alert(`La soumission a été approuvée avec succès.\nCommentaire: ${this.adminComment || 'Aucun commentaire'}`);
        },
        error: (error) => {
          console.error('Erreur lors de l\'approbation:', error);
          alert(`Erreur lors de l'approbation de la soumission.`);
        }
      });
    }
  }

  rejectWithComment() {
    if (this.selectedSubmission) {
      // Make API call to reject the demande
      this.http.post(`http://localhost:5082/api/Demande/RejectDemande/${this.selectedSubmission.id}`, {}).subscribe({
        next: (response) => {
          this.selectedSubmission.status = 'rejeté';
          if (this.adminComment) {
            console.log('Commentaire admin:', this.adminComment);
          }
          this.applyFilters();
          this.closeModal();
          alert(`La soumission a été rejetée avec succès.\nCommentaire: ${this.adminComment || 'Aucun commentaire'}`);
        },
        error: (error) => {
          console.error('Erreur lors du rejet:', error);
          alert(`Erreur lors du rejet de la soumission.`);
        }
      });
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

  public isImageField(field: string): boolean {
    return [
      'documentCIN',
      'documentJustificatif',
      'signaturePath',
      'selfie'
    ].includes(field);
  }

  public getFullImagePath(path: string): string {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    return `http://localhost:5082${path}`;
  }

  public toStr(val: any): string {
    return val === null || val === undefined ? '' : String(val);
  }

  sanitizeImageUrl(url: string): SafeResourceUrl {
    if (!url) return '';
    // If already absolute, don't prepend
    if (url.startsWith('http') || url.startsWith('data:')) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5082' + url);
  }
}