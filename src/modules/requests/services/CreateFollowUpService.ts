import AppError from '@shared/errors/AppError';

import FollowUpRequest from '../infra/typeorm/entities/FollowUpRequest';

import IRequestsRepository from '../repositories/IRequestsRepository';
import IFollowUpRequestsRepository from '../repositories/IFollowUpRequestsRepository';

interface IData {
  user_id: string;
  request_type: number;
  request_id: string;
}

class CreateFollowUpService {
  constructor(
    private followUpRequestsRepository: IFollowUpRequestsRepository,
    private requestsRepository: IRequestsRepository,
  ) {}

  public async execute(data: IData): Promise<FollowUpRequest> {
    const { user_id, request_type, request_id } = data;

    const request = await this.requestsRepository.findById(request_id);

    if (!request) {
      throw new AppError('request not foud', 404);
    }

    request.request_status_id = 2;
    await this.requestsRepository.save(request);

    const followUpAlreadyExists = await this.followUpRequestsRepository.findByRequestAndRequestType(
      request_id,
      request_type,
    );

    if (!followUpAlreadyExists) {
      const followUpCreated = await this.followUpRequestsRepository.create({
        request_id,
        request_type_id: request_type,
        user_id,
      });
      return followUpCreated;
    }

    return followUpAlreadyExists;
  }
}

export default CreateFollowUpService;
