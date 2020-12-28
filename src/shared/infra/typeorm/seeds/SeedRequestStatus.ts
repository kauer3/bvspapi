import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import RequestStatus from '@modules/requests/infra/typeorm/entities/RequestStatus';

export default class SeedRequestStatus implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(RequestStatus)
      .values([
        {
          name: 'em aberto',
          type: 'request',
          sequency: 1,
        },
        {
          name: 'em andamento',
          type: 'request',
          sequency: 2,
        },
        {
          name: 'concluído',
          type: 'request',
          sequency: 3,
        },
      ])
      .execute();
  }
}
