import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements AfterViewInit {
  @ViewChild('signaturePad', { static: false }) signaturePadElement!: ElementRef;
  signaturePad!: SignaturePad;

  ngAfterViewInit(): void {
      // Initialiser SignaturePad
      const canvas = this.signaturePadElement.nativeElement;
      this.signaturePad = new SignaturePad(canvas, {
          backgroundColor: '#ffffff', // Fond blanc pour le canvas
          penColor: '#000000', // Couleur de la signature
      });
  }

  // Effacer la signature
  clearSignature(): void {
      this.signaturePad.clear();
  }

  // Enregistrer la signature
  saveSignature(): void {
      if (this.signaturePad.isEmpty()) {
          alert('Veuillez fournir une signature avant de sauvegarder.');
          return;
      }

      // Récupérer la signature sous forme d'URL d'image
      const signatureImage = this.signaturePad.toDataURL();
      console.log('Signature sauvegardée :', signatureImage);

      // Vous pouvez envoyer cette image au serveur ou la stocker localement
      alert('Signature sauvegardée avec succès !');
  }
}
