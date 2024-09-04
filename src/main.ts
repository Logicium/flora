import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  // initialize the ORM, loading the config file dynamically
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
