import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserService } from './user/user.service';

@Module({
  imports: [AuthModule, UserModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService,UserService],
  
})
export class AppModule {}
