import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import UserProfile from '@modules/users/infra/typeorm/entities/UserProfile';

export default class SeedUserProfiles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserProfile)
      .values([
        {
          name: 'venda',
        },
        {
          name: 'atendimento',
        },
        {
          name: 'orçamento',
        },
        {
          name: 'engenharia',
        },
        {
          name: 'gestão',
        },
        {
          name: 'cliente',
        },
        {
          name: 'qualidade',
        },
      ])
      .execute();
  }
}
