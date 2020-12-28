import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import RequestType from '@modules/requests/infra/typeorm/entities/RequestType';

export default class SeedRequestTypes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(RequestType)
      .values([
        {
          name: 'venda',
        },
        {
          name: 'qualidade',
        },
        {
          name: 'orçamento',
        },
        {
          name: 'técnico',
        },
        {
          name: 'finalizar',
        },
      ])
      .execute();
  }
}
