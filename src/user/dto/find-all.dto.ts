import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class findAllData {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone_number: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  size: number = 10;
}
