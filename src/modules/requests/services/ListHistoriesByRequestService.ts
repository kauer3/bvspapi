import HistoryRequest from '../infra/typeorm/entities/HistoryRequest';

import IHistoryRequestsRepository from '../repositories/IHistoryRequestsRepository';

class ListHistoriesByRequestService {
  constructor(private historyRequestsRepository: IHistoryRequestsRepository) {}

  public async execute(request_id: string): Promise<HistoryRequest[]> {
    const histories = await this.historyRequestsRepository.listByRequestId(
      request_id,
    );

    return histories;
  }
}

export default ListHistoriesByRequestService;
