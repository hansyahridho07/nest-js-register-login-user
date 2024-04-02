import { Prisma, Role } from '@prisma/client';
import { IsEmail, IsOptional, IsString, IsUrl, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @Matches(
    `^${Object.values(Role)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  role?: Role;

  email_confirmation?: number;
}

export class UpdateArgsUser {
  where: Prisma.UserWhereInput;
  data: Prisma.UserUpdateInput;
}
