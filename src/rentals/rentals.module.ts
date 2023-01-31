import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './images',
    }),
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}
