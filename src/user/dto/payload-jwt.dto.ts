import { Role } from '@prisma/client';

export interface payloadJwt {
  id: string;
  name: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface responseJwt {
  type: string;
  access_token: string;
  expired_in: number;
}
