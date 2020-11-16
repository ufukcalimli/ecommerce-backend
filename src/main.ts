import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .listen(PORT)
    .then(() => console.log(`Server is running on ${PORT}`));
}
bootstrap();
