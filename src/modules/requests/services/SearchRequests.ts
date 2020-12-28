import Request from '../infra/typeorm/entities/Request';
import IRequestsRepository from '../repositories/IRequestsRepository';

class ListRequestsByUserService {
  constructor(private requestsRepository: IRequestsRepository) {}

  public async execute(
    name = '',
    requestStatusId: number,
    page: number,
    perpage: number,
  ): Promise<Request[]> {
    const requests = await this.requestsRepository.search(
      name,
      requestStatusId,
      page,
      perpage,
    );

    return requests;
  }
}

export default ListRequestsByUserService;
