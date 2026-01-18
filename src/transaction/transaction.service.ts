import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class TransactionService {
  private readonly filePath = path.join(process.cwd(), 'src/data', 'users.json');

  private async readUsers() {
    const fileData = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(fileData);
  }


  private async saveUsers(data: any) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }


  private findUserByNumCompte(users: any[], numCompte: string) {
    return users.find(u => u.numCompte === numCompte);
  }

  async payer(numCompte: string, montant: number) {
    const data = await this.readUsers();
    const user = this.findUserByNumCompte(data.users, numCompte);

    if (!user) {
      return { success: "False", message: "User not found" };
    }

    if (user.balance < montant || montant <= 0) {
      return { success: "False", message: "Insufficient balance" };
    }

    user.balance -= montant;
    user.transaction.push({
      date: new  Date().toISOString().split('T')[0],
      description: "Paiement Service",
      type: "-",
      montant: montant
    });

    await this.saveUsers(data);
    return { success: "True", user };
  }

  // RECHARGER (Recharge from card)
  async recharger(numCompte: string, compteSource: string, montant: number) {
    const data = await this.readUsers();
    const user = this.findUserByNumCompte(data.users, numCompte);

    if (!user) {
      return { success: "False", message: "User not found" };
    }

    const compte = user.comptes.find(c => c.type === compteSource);
    if (!compte) {
      return { success: "False", message: "Card not found" };
    }

    if (compte.solde < montant || montant <= 0) {
      return { success: "False", message: "Insufficient card balance" };
    }

    compte.solde -= montant;
    user.balance += montant;

    user.transaction.push({
      date: new Date().toISOString().split('T')[0],
      description: `Recharge depuis ${compteSource}`,
      type: "+",
      montant: montant
    });

    await this.saveUsers(data);
    return { success: "True", user };
  }

  // TRANSFERER (Transfer to another user)
  async transferer(expediteurNumCompte: string, destinataireNumCompte: string, montant: number) {
    const data = await this.readUsers();
    const expediteur = this.findUserByNumCompte(data.users, expediteurNumCompte);
    const destinataire = this.findUserByNumCompte(data.users, destinataireNumCompte);

    if (!expediteur || !destinataire) {
      return { success: "False", message: "User not found" };
    }

    if (expediteur.balance < montant || montant <= 0) {
      return { success: "False", message: "Insufficient balance" };
    }

    expediteur.balance -= montant;
    destinataire.balance += montant;

    const date = new Date().toISOString().split('T')[0];

    expediteur.transaction.push({
      date,
      description: `Transfert vers ${destinataire.nom}`,
      type: "-",
      montant
    });

    destinataire.transaction.push({
      date,
      description: `Reçu de ${expediteur.nom}`,
      type: "+",
      montant
    });

    await this.saveUsers(data);
    return { success: "True", expediteur, destinataire };
  }
}