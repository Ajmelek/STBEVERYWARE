import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { NotificationService, WalletNotification } from '../../services/notification.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  @Input() isSuperAdmin : string | any ;

  user : any;
  showNotifications = false;
  notifications: any[] = [];
  isLoading = false;
  private notificationInterval: any;
  private clientIdCheckInterval: any;

  constructor(
    private router : Router, 
    private authService: AuthService,
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("login");
    if (this.user == "admin" && this.isSuperAdmin == "1" )
      this.user = "Super Admin";
    if (this.isClient) {
      const clientId = this.authService.getClientId();
      if (clientId) {
        this.loadNotifications();
        this.startNotificationPolling();
      } else {
        this.clientIdCheckInterval = setInterval(() => {
          const newClientId = this.authService.getClientId();
          if (newClientId) {
            this.loadNotifications();
            this.startNotificationPolling();
            clearInterval(this.clientIdCheckInterval);
          }
        }, 1000); // check every 1s
      }
    }
  }

  private startNotificationPolling() {
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
    }
    this.notificationInterval = setInterval(() => {
      this.loadNotifications();
    }, 30000); // 30 seconds
  }

  ngOnDestroy(): void {
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
    }
    if (this.clientIdCheckInterval) {
      clearInterval(this.clientIdCheckInterval);
    }
  }

  loadNotifications() {
    const clientId = this.authService.getClientId();
    if (!clientId) {
      console.error('Client ID not found');
      return;
    }

    this.isLoading = true;
    this.notificationService.getWalletNotifications(parseInt(clientId)).subscribe({
      next: (walletNotifications: WalletNotification[]) => {
        // Map API notifications to the expected format
        this.notifications = walletNotifications.map(notif => ({
          id: notif.id,
          icon: this.getNotificationIcon(notif.status),
          message: notif.message,
          time: this.formatTime(notif.createdAt),
          type: 'wallet',
          isRead: notif.isRead,
          status: notif.status
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
        this.isLoading = false;
        // Fallback to static notifications if API fails
        this.loadStaticNotifications();
      }
    });
  }

  private getNotificationIcon(status: string): string {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'pending':
      case 'en attente':
        return 'bx bx-time';
      case 'approved':
      case 'approuvé':
        return 'bx bx-check-circle';
      case 'rejected':
      case 'rejeté':
        return 'bx bx-x-circle';
      case 'processing':
      case 'en cours':
        return 'bx bx-loader-alt';
      default:
        return 'bx bx-wallet';
    }
  }

  private formatTime(createdAt: string): string {
    const date = new Date(createdAt);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    console.log('diffInMinutes:', diffInMinutes);
    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `il y a ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `il y a ${Math.floor(diffInMinutes / 60)} h`;
    return `il y a ${Math.floor(diffInMinutes / 1440)} j`;
  }

  private loadStaticNotifications() {
    this.notifications = [
      {
        icon: 'bx bx-wallet',
        message: 'Nouvelle demande de Wallet',
        time: 'il y a 2 min',
        type: 'wallet'
      },
      {
        icon: 'bx bx-file',
        message: 'Nouvelle fiche KYC soumise',
        time: 'il y a 10 min',
        type: 'kyc'
      },
      {
        icon: 'bx bx-credit-card',
        message: 'Demande de carte bancaire reçue',
        time: 'il y a 30 min',
        type: 'card'
      },
      {
        icon: 'bx bx-message-square-dots',
        message: 'Nouvelle réclamation client',
        time: 'il y a 1 h',
        type: 'complaint'
      },
      {
        icon: 'bx bx-money',
        message: 'Demande de chéquier en attente',
        time: 'il y a 2 h',
        type: 'checkbook'
      }
    ];
  }

  ShowHideMenu(){
    document.getElementsByTagName("body")[0].classList.toggle('toggle-sidebar');
  }

  goTo(a:string){
    this.router.navigate(['home',a]);
  }


  signOut(){
    this.router.navigateByUrl("/login");
  }
  handleLogout() {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    console.log('Authentication data cleared');
    window.location.href = 'stb_ebank.html';
    console.log('Redirecting to login page');
  }

  get isClient(): boolean {
    return this.authService.getUserRole() === 'client';
  }

  handleNotifications() {
    if (this.isClient) {
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications) {
        this.loadNotifications();
      }
    }
  }

  goToNotifications(event: Event) {
    event.preventDefault();
    // If you have a notifications page, route to it here:
    // this.router.navigate(['/notifications']);
    // For now, just keep the panel open (do nothing)
  }

  get unreadCount(): number {
    return Array.isArray(this.notifications)
      ? this.notifications.filter(n => n && n.isRead === false).length
      : 0;
  }

  markAsRead(notif: any) {
    if (!notif.isRead) {
      console.log('Marking notification as read:', notif.id);
      this.notificationService.markNotificationAsRead(notif.id).subscribe({
        next: (res) => {
          console.log('Marked as read:', notif.id, res);
          notif.isRead = true;
        },
        error: (err) => {
          console.error('Failed to mark notification as read', notif.id, err);
        }
      });
    }
  }

  markAllAsRead() {
    const unread = this.notifications.filter(n => !n.isRead);
    unread.forEach(notif => {
      console.log('Marking notification as read:', notif.id);
      this.notificationService.markNotificationAsRead(notif.id).subscribe({
        next: (res) => {
          console.log('Marked as read:', notif.id, res);
          notif.isRead = true;
        },
        error: (err) => {
          console.error('Failed to mark notification as read', notif.id, err);
        }
      });
    });
  }
}
