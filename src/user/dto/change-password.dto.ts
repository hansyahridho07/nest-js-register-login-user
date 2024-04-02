import { Prisma } from "@prisma/client"
import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class ChangePassword {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    old_password: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    new_password_1: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    new_password_2: string
}

export class ArgsChangePassword {
    where: Prisma.UserWhereInput
    select: Prisma.UserSelect
}