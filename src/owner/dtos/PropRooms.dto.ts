import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoomType } from '../entities/PropRoom.entity';

export class PropertyRoomsDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  main_image_i: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  main_image_ii: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  main_image_iii: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  bath_image_i: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  bath_image_ii: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  others_image_i: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  others_image_ii: string;

  @IsEnum(RoomType)
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;
}
