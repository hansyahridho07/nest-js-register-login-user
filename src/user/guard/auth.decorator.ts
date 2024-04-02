import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserGuard } from './user.guard';
import { Role } from '@prisma/client';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(UserGuard)
  );
}