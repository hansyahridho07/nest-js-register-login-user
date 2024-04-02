import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data transfer object for Login
 */
export class LoginUser {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ArgsLogin {
  where: Prisma.UserWhereInput;
  select: Prisma.UserSelect;
}
