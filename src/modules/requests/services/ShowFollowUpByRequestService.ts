import FollowUpRequest from '../infra/typeorm/entities/FollowUpRequest';
import IFollowUpRequestsRepository from '../repositories/IFollowUpRequestsRepository';

class ShowFollowUpByRequestService {
  constructor(
    private followUpRequestsRepository: IFollowUpRequestsRepository,
  ) {}

  public async execute(
    request_id: string,
    request_type_id: number,
  ): Promise<FollowUpRequest | undefined> {
    const followUp = await this.followUpRequestsRepository.showByRequestAndRequestType(
      request_id,
      request_type_id,
    );

    return followUp;
  }
}

export default ShowFollowUpByRequestService;
