import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-desactivation-compte',
  templateUrl: './gestion-desactivation-compte.component.html',
  styleUrls: ['./gestion-desactivation-compte.component.scss']
})
export class GestionDesactivationCompteComponent {
  clients = [
    { id: 1, nom: 'Ben Ali', prenom: 'Aymen', email: 'aymen.benali@email.tn', statut: 'En attente' },
    { id: 2, nom: 'Trabelsi', prenom: 'Sana', email: 'sana.trabelsi@email.tn', statut: 'En attente' },
    { id: 3, nom: 'Masmoudi', prenom: 'Walid', email: 'walid.masmoudi@email.tn', statut: 'En attente' }
  ];

  approuver(client: any) {
    client.statut = 'Approuvé';
  }

  rejeter(client: any) {
    client.statut = 'Rejeté';
  }
} 