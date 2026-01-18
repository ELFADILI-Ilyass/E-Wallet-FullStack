import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('Ewallet')  // ✅ Same as AppController - all routes under /Ewallet
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('payer')
  async payer(@Body() body: any) {
    return this.transactionService.payer(body.numCompte, body.montant);
  }

  @Post('recharger')
  async recharger(@Body() body: any) {
    return this.transactionService.recharger(
      body.numCompte,
      body.compteSource,
      body.montant
    );
  }

  @Post('transferer')
  async transferer(@Body() body: any) {
    return this.transactionService.transferer(
      body.expediteurNumCompte,
      body.destinataireNumCompte,
      body.montant
    );
  }
}