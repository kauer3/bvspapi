import firebase from '@config/firebase';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserDataDTO from '@modules/users/dtos/IUserDataDTO';

class UsersRepository implements IUsersRepository {
  public async findById(id: string): Promise<IUserDataDTO | undefined> {
    const user = await firebase
      .firestore()
      .collection('users')
      .doc(id)
      .get()
      .then(snapshot => {
        const {
          name,
          name_insensitive,
          city,
          country,
          company,
          email,
          accesscode,
          profile_type,
          type,
        } = snapshot.data() as IUserDataDTO;

        return {
          id,
          name,
          name_insensitive,
          city,
          country,
          company,
          email,
          accesscode,
          profile_type,
          type,
        };
      })
      .catch(error => {
        throw new AppError(error);
      });

    return user;
  }

  public async findByEmail(email: string): Promise<IUserDataDTO | undefined> {
    const user = await firebase
      .firestore()
      .collection('users')
      .where('email', '==', email.toLowerCase().trim())
      .get()
      .then(snapshot => {
        const doc = snapshot.docs[0];

        return doc
          ? {
              id: doc.id,
              name: doc.data().name,
              name_insensitive: doc.data().name_insensitive,
              city: doc.data().city,
              country: doc.data().country,
              company: doc.data().company,
              email: doc.data().email,
              accesscode: doc.data().accesscode,
              profile_type: doc.data().profile_type,
              type: doc.data().type,
            }
          : undefined;
      })
      .catch(error => {
        throw new AppError(error);
      });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<IUserDataDTO> {
    const response = await firebase
      .firestore()
      .collection('users')
      .add(userData)
      .then()
      .catch(error => {
        throw new AppError(error);
      });

    const data = {
      id: response.id,
      ...userData,
    };

    return data;
  }

  public async save(userData: IUserDataDTO): Promise<IUserDataDTO> {
    await firebase
      .firestore()
      .collection('users')
      .doc(userData.id)
      .update(userData);

    return userData;
  }

  public async remove(id: string): Promise<void> {
    await firebase.firestore().collection('users').doc(id).delete();
  }
}

export default UsersRepository;
