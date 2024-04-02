import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQueryBuilder {
  async createQuery<T>(model: any, dto: any): Promise<T> {
    const result: T = await model.create({
      data: { ...dto },
    });

    return result;
  }

  async findOneByParameterQuery<T>(
    model: any,
    args: any = { where: undefined },
  ): Promise<T> {
    const result: T = await model.findFirst({ ...args });
    return result;
  }

  async updateQuery<T>(model: any, args: any): Promise<T> {
    const result: T = await model.update({ ...args });
    return result;
  }
}
