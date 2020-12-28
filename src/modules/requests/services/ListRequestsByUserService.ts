import Request from '../infra/typeorm/entities/Request';
import IRequestsRepository from '../repositories/IRequestsRepository';

class ListRequestsByUserService {
  constructor(private requestsRepository: IRequestsRepository) {}

  public async execute(
    userId: string,
    page: number,
    perpage: number,
  ): Promise<Request[]> {
    const requests = await this.requestsRepository.listByUserId(
      userId,
      page,
      perpage,
    );

    return requests;
  }
}

export default ListRequestsByUserService;
