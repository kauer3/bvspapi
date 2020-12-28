import FollowUpRequest from '../infra/typeorm/entities/FollowUpRequest';

import IFollowUpRequestsRepository from '../repositories/IFollowUpRequestsRepository';

class ListAllFollowUpsRequestService {
  constructor(
    private followUpRequestsRepository: IFollowUpRequestsRepository,
  ) {}

  public async execute(request_id: string): Promise<FollowUpRequest[]> {
    const followUps = await this.followUpRequestsRepository.listByRequestId(
      request_id,
    );

    return followUps;
  }
}

export default ListAllFollowUpsRequestService;
