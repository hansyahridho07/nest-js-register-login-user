import { Prisma } from "@prisma/client"
import { IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator"

export class ForgetPassword {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    first_password:  string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    second_password:  string
}

export class ParamForgetPassword{
    @IsNotEmpty()
    @IsUUID()
    token_confirmation: string
}

export class ArgsForgetPassword {
    where: Prisma.UserWhereInput
    select: Prisma.UserSelect
}