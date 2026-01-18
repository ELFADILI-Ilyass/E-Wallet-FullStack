import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//creating d un serveur web dans l ip
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add this exact block
  app.enableCors({
    origin: '*', // This allows ALL frontends to connect (best for testing)
    //cad frontend dev only 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
