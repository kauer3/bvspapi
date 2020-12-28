import firebase from '@config/firebase';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  profile_id: number;
  name: string;
  city: string;
  city_state: string;
  country: string;
  company: string;
  email: string;
  telephone: string;
  password: string;
}

class UserExportGogleFirestoreToPostgres {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute(): Promise<string> {
    const snapshot = await firebase.firestore().collection('users').get();

    // eslint-disable-next-line
    for await (const doc of snapshot.docs) {
      const passwordHashed = await this.hashProvider.generateHash(
        String(doc.data().accesscode),
      );

      const data = {
        profile_id: 6,
        name: String(doc.data().name),
        city: doc.data().city ? String(doc.data().city) : '',
        city_state: doc.data().city_state ? String(doc.data().city_state) : '',
        country: doc.data().country ? String(doc.data().country) : '',
        company: String(doc.data().company),
        email: String(doc.data().email),
        telephone: doc.data().telephone ? String(doc.data().telephone) : '',
        password: passwordHashed,
      };

      await this.usersRepository.create(data);
    }

    return 'Exportação concluída';
  }
}

export default UserExportGogleFirestoreToPostgres;
