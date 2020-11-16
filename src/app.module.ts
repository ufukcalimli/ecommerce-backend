import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-dotenv/dist/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // loads env variables
    TypeOrmModule.forRoot({
      ...config.typeorm,
    }),
    BrandModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
