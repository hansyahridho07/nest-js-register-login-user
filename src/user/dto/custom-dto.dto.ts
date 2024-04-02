import { Prisma } from '@prisma/client';

export class SelectProperyCheckToken {
  where?: Prisma.UserWhereInput;
  select?: Prisma.UserSelect;
  data?: DataUpdatetoken;
}

interface DataUpdatetoken {
  status: number;
  email_confirmation: number;
}

export class PayloadFindAllUser {
  where?: Prisma.UserWhereInput = {};
  page?: number = 0;
  size = 10;
}
