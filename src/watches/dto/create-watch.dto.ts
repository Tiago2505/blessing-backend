import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Gender } from '../enums';

export class CreateWatchDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsBoolean()
  @IsOptional()
  @Type(()=>Boolean)
  isAvailable?: boolean;
}
