import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  // initialize the ORM, loading the config file dynamically
  const app = await NestFactory.create(AppModule,{
    rawBody: true,
    bodyParser: true,
  });
  app.enableCors();
  const PORT = Number(process.env.PORT) || 3000;
  await app.listen(PORT);
}
bootstrap();
