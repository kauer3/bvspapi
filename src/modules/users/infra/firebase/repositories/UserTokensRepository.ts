import firebase from '@config/firebase';

import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '@modules/users/dtos/IUserTokenDTO';
import ITokenCreate from '@modules/users/dtos/ITokenCreate';

class UserTokensRepository implements IUserTokensRepository {
  public async save(tokenData: ITokenCreate): Promise<UserToken> {
    const response = await firebase
      .firestore()
      .collection('tokens')
      .add(tokenData)
      .then()
      .catch(error => {
        throw new AppError(error);
      });

    const token = {
      id: response.id,
      ...tokenData,
    };

    return token;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const tokenData = await firebase
      .firestore()
      .collection('token')
      .where('token', '==', token)
      .get()
      .then(snapshot => {
        const doc = snapshot.docs[0];

        return doc
          ? {
              id: doc.id,
              token: doc.data().token,
              user_id: doc.data().user_id,
              created_at: doc.data().created_at,
              updated_at: doc.data().updated_at,
            }
          : undefined;
      })
      .catch(error => {
        throw new AppError(error);
      });

    return tokenData;
  }
}

export default UserTokensRepository;
