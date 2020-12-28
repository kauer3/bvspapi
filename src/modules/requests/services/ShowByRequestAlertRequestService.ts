import IAlertsRequestsRepository from '../repositories/IAlertsRequestsRepository';

import AlertRequesta from '../infra/typeorm/entities/AlertRequest';

class ShowByRequestAlertRequestService {
  constructor(private alertsRequestsRepository: IAlertsRequestsRepository) {}

  public async execute(request_id: string): Promise<AlertRequesta | undefined> {
    const alertExists = await this.alertsRequestsRepository.findByRequestId(
      request_id,
    );

    return alertExists;
  }
}

export default ShowByRequestAlertRequestService;
