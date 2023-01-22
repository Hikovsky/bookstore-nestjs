import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { GenreModule } from './genre/genre.module';
import { AuthorModule } from './author/author.module';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    BookModule,
    GenreModule,
    AuthorModule,
    OrderModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
