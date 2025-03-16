import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  formattedDate: any;
  constructor() {
    const now = new Date();
const formatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
const formattedDate = formatter.format(now);

console.log(formattedDate); // Exemple : "22 février 2025"
  }
}

