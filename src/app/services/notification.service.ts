import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface WalletNotification {
  id: number;
  message: string;
  status: string;
  createdAt: string;
  isRead: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getWalletNotifications(clientId: number): Observable<WalletNotification[]> {
    return this.http.get<WalletNotification[]>(`${this.apiUrl}/DemandeWallet/notifications/${clientId}`);
  }

  markNotificationAsRead(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/DemandeWallet/notifications/${id}/mark-as-read`, null);
  }
} 