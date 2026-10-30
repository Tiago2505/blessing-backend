import { PartialType } from '@nestjs/mapped-types';
import { CreateWatchDto } from './create-watch.dto';
import { WatchImage } from '../interfaces';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateWatchDto extends PartialType(CreateWatchDto) {
  @IsArray()
  @IsOptional()
  deletedImages: WatchImage[];
}
