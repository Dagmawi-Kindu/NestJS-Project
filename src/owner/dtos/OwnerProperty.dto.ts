import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PropType } from '../entities/OwnerProperty.entity';

export class OwnerPropertyDto {
  @IsNotEmpty()
  @IsString()
  propName: string;

  @IsNotEmpty()
  @IsString()
  propDescription: string;

  @IsEnum(PropType)
  @IsNotEmpty()
  propType: string;

  @IsNotEmpty()
  @IsNumber()
  totalNoOfRooms: number;

  @IsNotEmpty()
  @IsNumber()
  singleSized: number;

  @IsNotEmpty()
  @IsNumber()
  kingSized: number;

  @IsNotEmpty()
  @IsNumber()
  doubleSized: number;

  @IsNotEmpty()
  @IsNumber()
  deluxeSized: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  checkIn: string;

  @IsNotEmpty()
  @IsString()
  checkOut: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  buildingFront: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  buildingSide: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  receptionImage1: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  receptionImage2: string;
}
