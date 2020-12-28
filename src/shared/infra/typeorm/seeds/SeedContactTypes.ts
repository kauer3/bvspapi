import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import ContactType from '@modules/requests/infra/typeorm/entities/ContactType';

export default class SeedContactTypes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(ContactType)
      .values([
        {
          name: 'e-mail',
        },
        {
          name: 'ligação',
        },
        {
          name: 'whatsapp',
        },
      ])
      .execute();
  }
}
