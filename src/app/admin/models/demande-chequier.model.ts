export interface DemandeDeChequier {
    id: number;
    clientId: number;
    client: {
        nom: string;
        prenom: string;
    };
    telephone: string;
    adresseEmail: string;
    nombreChequiersDemandes: number;
    dateDemande: Date;
    etat: number; // 0: en attente, 1: approuvé, 2: rejeté
} 