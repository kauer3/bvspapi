import firebase from '@config/firebase';

import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '@modules/users/dtos/IUserTokenDTO';
import ITokenCreate from '@modules/users/dtos/ITokenCreate';

class UserTokensRepository implements IUserTokensRepository {
  public async create(tokenData: ITokenCreate): Promise<UserToken> {
    const response = await firebase
      .firestore()
      .collection('tokens')
      .add({
        ...tokenData,
        valid: true,
      })
      .then()
      .catch(error => {
        throw new AppError(error);
      });

    const token = {
      id: response.id,
      valid: true,
      ...tokenData,
    };

    return token;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const tokenData = await firebase
      .firestore()
      .collection('tokens')
      .where('token', '==', token)
      .get()
      .then(snapshot => {
        const doc = snapshot.docs[0];

        return doc
          ? {
              id: doc.id,
              token: doc.data().token,
              user_id: doc.data().user_id,
              valid: doc.data().valid,
              created_at: doc.data().created_at,
            }
          : undefined;
      })
      .catch(error => {
        throw new AppError(error);
      });

    return tokenData;
  }

  public async invalidate(tokenId: string): Promise<void> {
    await firebase.firestore().collection('tokens').doc(tokenId).update({
      valid: false,
    });
  }

  public async findByUserAndRecoveryCode(
    recoveryCode: string,
  ): Promise<string | undefined> {
    const token = await firebase
      .firestore()
      .collection('tokens')
      .where('code', '==', recoveryCode)
      .where('valid', '==', true)
      .get()
      .then(snapshot => {
        return snapshot.empty ? undefined : snapshot.docs[0].data().token;
      })
      .catch(error => {
        throw new AppError(error);
      });

    return token;
  }
}

export default UserTokensRepository;
