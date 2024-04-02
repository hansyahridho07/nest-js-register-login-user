import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ArgsChangePassword,
  ArgsForgetPassword,
  ArgsLogin,
  ChangePassword,
  CreateUserDto,
  findAllData,
  ForgetPassword,
  LoginUser,
  ParamForgetPassword,
  payloadJwt,
  responseJwt,
  SelectProperyCheckToken,
  UpdateArgsUser,
  UpdateUserDto,
} from './dto/index.dto';
import { PrismaService } from 'src/library/prisma/prisma.service';
import { PrismaQueryBuilder } from 'src/helpers/PrismaQueryBuilder.helper';
import {
  ExceptionResponse,
  SuccessResponse,
} from 'src/library/dto/General-Response';
import { User } from '../email/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { User as modelUser } from '@prisma/client';
import { CheckData } from 'src/helpers/CheckData.helper';
import {
  PaginatedResult,
  PaginateFunction,
  paginator,
} from 'src/library/middlewares/pagination';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const paginate: PaginateFunction = paginator({});

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queryBuilder: PrismaQueryBuilder,
    private readonly emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  /**
   * function for create user
   */
  async create(createUserDto: CreateUserDto): Promise<SuccessResponse> {
    createUserDto.password = await Bcrypt.createEncrypt(createUserDto.password);
    const result = await this.queryBuilder.createQuery<modelUser>(
      this.prisma.user,
      createUserDto,
    );
    const user: User = {
      email: createUserDto.email,
      name: createUserDto.name,
    };
    await this.emailService.sendUserConfirmation(
      user,
      result.token_confirmation,
    );
    const output = new SuccessResponse(true, 201, 'Success create user');
    return output;
  }

  async tokenConfrimation(token: string): Promise<SuccessResponse> {
    CheckData.notFound(token, 'Token confirmation not found');
    const conditionCheckToken: SelectProperyCheckToken = {
      where: {
        token_confirmation: token,
      },
      select: {
        id: true,
        status: true,
        email_confirmation: true,
      },
    };
    const result = await this.queryBuilder.findOneByParameterQuery<modelUser>(
      this.prisma.user,
      {
        ...conditionCheckToken,
      },
    );

    /**
     * STATUS
     * 0 = NOT ACTIVE
     * 1 = ACTIVE
     * 2= BLOCK
     */
    if (result.status === 1 && result.email_confirmation === 1)
      return new SuccessResponse(true, 200, 'User already active');
    if (result.email_confirmation === 1)
      return new SuccessResponse(true, 200, 'User already active');
    if (result.email_confirmation === 2) {
      throw new HttpException(
        new ExceptionResponse(400, 'User is block'),
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatePayload: SelectProperyCheckToken = {
      where: {
        id: result.id,
      },
      data: {
        email_confirmation: 1,
        status: 1,
      },
    };

    await this.queryBuilder.updateQuery<modelUser>(this.prisma.user, {
      ...updatePayload,
    });

    const output = new SuccessResponse(true, 200, 'Success activated email');
    return output;
  }

  async findAll(payload: findAllData): Promise<PaginatedResult<modelUser>> {
    const where: Prisma.UserWhereInput = {};

    if (payload.name) where.name = { contains: payload.name };
    if (payload.email) where.email = { contains: payload.email };
    if (payload.phone_number)
      where.phone_number = { contains: payload.phone_number };

    return paginate(
      this.prisma.user,
      {
        where,
        select: {
          name: true,
          email: true,
          status: true,
          role: true,
        },
      },
      {
        page: payload.page,
        perPage: payload.size,
      },
    );
  }

  async login(payload: LoginUser): Promise<SuccessResponse> {
    const args: ArgsLogin = {
      where: { email: payload.email },
      select: {
        email: true,
        name: true,
        password: true,
        status: true,
        email_confirmation: true,
        role: true,
        id: true,
      },
    };

    const checkUser =
      await this.queryBuilder.findOneByParameterQuery<modelUser>(
        this.prisma.user,
        { ...args },
      );

    if (
      !checkUser ||
      !(await Bcrypt.comparePassword(payload.password, checkUser.password))
    ) {
      throw new HttpException(
        new ExceptionResponse(400, 'Email or password wrong'),
        HttpStatus.BAD_REQUEST,
      );
    }

    const dataJwt: payloadJwt = {
      id: checkUser.id,
      email: checkUser.email,
      name: checkUser.name,
      role: checkUser.role,
    };

    const resultJwt: responseJwt = {
      type: 'Bearer',
      access_token: await this.jwtService.signAsync(dataJwt),
      expired_in: 1000 * 60 * 15 - 1,
    };

    const output = new SuccessResponse(true, 200, 'success', resultJwt);
    return output;
  }

  async updateUser(
    payload: UpdateUserDto,
    user: payloadJwt,
  ): Promise<SuccessResponse> {
    const where: Prisma.UserFindUniqueArgs = {
      where: { id: user.id },
    };
    const userData = await this.queryBuilder.findOneByParameterQuery<modelUser>(
      this.prisma.user,
      { ...where },
    );
    CheckData.notFound(userData, 'User not found');

    const argsUpdate: UpdateArgsUser = {
      where: { id: user.id },
      data: { ...payload },
    };

    let message = 'Update user data is success';
    // verification email again if change email account

    if (payload.email && payload.email !== userData.email) {
      argsUpdate.data.email_confirmation = 0;
    }

    await this.queryBuilder.updateQuery<modelUser>(this.prisma.user, {
      ...argsUpdate,
    });

    // send email verification if change email
    if (payload.email && payload.email !== userData.email) {
      const dataEmailUser: User = {
        email: payload.email,
        name: userData.name,
      };

      // send again email confirmation
      await this.emailService.sendUserConfirmation(
        dataEmailUser,
        userData.token_confirmation,
      );
      message =
        'Update user data is success, please verification your email again';
    }

    return new SuccessResponse(true, 200, message);
  }

  async forgetPassword({first_password, second_password}: ForgetPassword, {token_confirmation}: ParamForgetPassword){
    // check first and second password is same
    if (first_password !== second_password){
      throw new HttpException(new ExceptionResponse(400, "Password not match"), HttpStatus.BAD_REQUEST)
    }
    const args: ArgsForgetPassword = {
      where: { token_confirmation: token_confirmation },
      select: {
        id: true,
        password: true,
      }
    }
    const checkUser = await this.queryBuilder.findOneByParameterQuery<modelUser>(
      this.prisma.user, {...args}
    )
    CheckData.notFound(checkUser, "User not found")

    // check is new password is same or not with previous password
    if(await Bcrypt.comparePassword(first_password, checkUser.password)){
      throw new HttpException(new ExceptionResponse(400, "New password must different from previous password"), HttpStatus.BAD_REQUEST)
    }

    const argsUpdate: Prisma.UserUpdateArgs = {
      where: { id: checkUser.id },
      data: {
        password: await Bcrypt.createEncrypt(first_password)
      }
    }
    await this.queryBuilder.updateQuery<modelUser>(
      this.prisma.user, {...argsUpdate}
    )
    
    return new SuccessResponse(true, 200, "Success update password")
  }

  async changePassword(payload: ChangePassword, jwt: payloadJwt){
    const { old_password, new_password_1, new_password_2} = payload

    // check new first and second is same
    if (new_password_1 !== new_password_2){
      throw new HttpException(new ExceptionResponse(400, "Password not match"), HttpStatus.BAD_REQUEST)
    }

    const argsCheck: ArgsChangePassword = {
      where: { id: jwt.id },
      select: {
        id: true,
        password: true,
      }
    }

    const checkUser = await this.queryBuilder.findOneByParameterQuery<modelUser>(
      this.prisma.user, {...argsCheck}
    )
    CheckData.notFound(checkUser, "User not found")

    //  check if old password is right
    if(!await Bcrypt.comparePassword(old_password, checkUser.password)){
      throw new HttpException(new ExceptionResponse(400, "Previous password is wrong"), HttpStatus.BAD_REQUEST)
    }

    const argsUpdate: Prisma.UserUpdateArgs = {
      where:  { id: jwt.id },
      data: { password: await  Bcrypt.createEncrypt(new_password_1) }
    }

    await this.queryBuilder.updateQuery<modelUser>(
      this.prisma.user, {...argsUpdate}
    )

    return new SuccessResponse(true,200,"Success change password")
  }
}

class Bcrypt {
  public static async createEncrypt(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public static async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
