import { Component } from '@angular/core';

@Component({
  selector: 'app-competef-bank',
  templateUrl: './competef-bank.component.html',
  styleUrls: ['./competef-bank.component.css']
})
export class CompetefBankComponent {
  // Component logic can be added here
  title = 'Competef Bank Services';
  
  selectAccount(accountType: string) {
    console.log(`Selected account: ${accountType}`);
    // Add your account selection logic here
  }
}