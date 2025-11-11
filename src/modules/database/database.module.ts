import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      // Automatically load entities registered via TypeOrmModule.forFeature(...)
      autoLoadEntities: true,
      // OK for dev / coursework; disable in production and use migrations instead
      synchronize: true,
      logging: ['error', 'schema'],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
