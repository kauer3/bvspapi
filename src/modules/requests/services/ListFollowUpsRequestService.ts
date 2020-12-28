import FollowUpRequest from '../infra/typeorm/entities/FollowUpRequest';
import { ISearchData } from '../infra/typeorm/repositories/FollowUpRequestsRepository';
import IFollowUpRequestsRepository from '../repositories/IFollowUpRequestsRepository';

interface IData {
  request_type_id: number;
  request_status_id: number;
  name: string;
  page: number;
  perpage: number;
}

class ListFollowUpsRequestService {
  constructor(
    private followUpRequestsRepository: IFollowUpRequestsRepository,
  ) {}

  public async execute(data: IData): Promise<ISearchData[]> {
    const { request_type_id, request_status_id, name, page, perpage } = data;

    const followUps = await this.followUpRequestsRepository.search(
      request_type_id,
      request_status_id,
      name,
      page,
      perpage,
    );

    return followUps;
  }
}

export default ListFollowUpsRequestService;
