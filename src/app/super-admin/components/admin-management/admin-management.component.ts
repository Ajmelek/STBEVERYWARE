import { Component, OnInit } from '@angular/core';

interface Admin {
  id: number;
  adminId: string;
  nom: string;
  prenom: string;
  email: string;
  role: 'admin' | 'super_admin';
  status: 'actif' | 'inactif';
  dateCreation: string;
  derniereConnexion: string;
}

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent implements OnInit {
  admins: Admin[] = [];
  filteredAdmins: Admin[] = [];
  statusFilter: string = '';
  roleFilter: string = '';
  searchQuery: string = '';

  ngOnInit() {
    // Mock data
    this.admins = [
      {
        id: 1,
        adminId: 'ADM001',
        nom: 'Dubois',
        prenom: 'Thomas',
        email: 'thomas.dubois@bank.com',
        role: 'admin',
        status: 'actif',
        dateCreation: '2024-01-10',
        derniereConnexion: '2024-03-16'
      },
      {
        id: 2,
        adminId: 'ADM002',
        nom: 'Leroy',
        prenom: 'Sophie',
        email: 'sophie.leroy@bank.com',
        role: 'admin',
        status: 'actif',
        dateCreation: '2024-01-15',
        derniereConnexion: '2024-03-15'
      },
      {
        id: 3,
        adminId: 'ADM003',
        nom: 'Moreau',
        prenom: 'Pierre',
        email: 'pierre.moreau@bank.com',
        role: 'super_admin',
        status: 'actif',
        dateCreation: '2024-01-05',
        derniereConnexion: '2024-03-16'
      },
      {
        id: 4,
        adminId: 'ADM004',
        nom: 'Petit',
        prenom: 'Marie',
        email: 'marie.petit@bank.com',
        role: 'admin',
        status: 'inactif',
        dateCreation: '2024-02-01',
        derniereConnexion: '2024-03-10'
      }
    ];
    this.applyFilters();
  }

  applyFilters() {
    this.filteredAdmins = this.admins.filter(admin => {
      const matchesStatus = !this.statusFilter || admin.status === this.statusFilter;
      const matchesRole = !this.roleFilter || admin.role === this.roleFilter;
      const matchesSearch = !this.searchQuery || 
        admin.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        admin.prenom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        admin.adminId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesStatus && matchesRole && matchesSearch;
    });
  }

  showMockAction(action: string, admin: Admin) {
    console.log(`Action simulée ${action} pour l'admin:`, admin);
    alert(`Ceci est une action simulée ${action} pour l'admin ${admin.prenom} ${admin.nom}.`);
  }
} 