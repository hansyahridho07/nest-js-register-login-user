import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  Put,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ChangePassword,
  CreateUserDto,
  findAllData,
  ForgetPassword,
  LoginUser,
  ParamForgetPassword,
  payloadJwt,
  UpdateUserDto,
} from './dto/index.dto';
import { Roles } from './guard/roles.decorator';
import { UserGuard } from './guard/user.guard';
import { Role } from '@prisma/client';
import { Auth } from './guard/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(UserGuard)
  // @Roles([Role.SUPERADMIN, Role.ADMIN])
  @Auth("SUPERADMIN","ADMIN")
  @Get()
  findAll(@Query() payload: findAllData) {
    return this.userService.findAll(payload);
  }

  @Get('email-confirmation/:token')
  tokenConfirmation(@Param('token') token: string) {
    return this.userService.tokenConfrimation(token);
  }

  @Post('login')
  login(@Body() payload: LoginUser) {
    return this.userService.login(payload);
  }

  @UseGuards(UserGuard)
  // @Roles([])
  @Put()
  updateUser(@Body() payload: UpdateUserDto, @Request() req) {
    const user: payloadJwt = req.user;
    return this.userService.updateUser(payload, user);
  }

  @Patch("/forget-password/:token_confirmation")
  forgetPassword(@Body() payload: ForgetPassword, @Param() token: ParamForgetPassword){
    return this.userService.forgetPassword(payload, token)
  }

  @UseGuards(UserGuard)
  @Patch("/change-password")
  changePassword(@Body() payload: ChangePassword, @Request() req){
    const jwt: payloadJwt = req.user
    return this.userService.changePassword(payload, jwt)
  }
}
