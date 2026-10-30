import { Module } from '@nestjs/common';
import { WatchesService } from './watches.service';
import { WatchesController } from './watches.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Watch } from './entities/watch.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [WatchesController],
  providers: [WatchesService],
  imports: [CloudinaryModule, TypeOrmModule.forFeature([Watch]), ConfigModule],
})
export class WatchesModule {}
