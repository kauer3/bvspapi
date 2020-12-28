import { format } from 'date-fns';
import IAlertsRequestsRepository from '../repositories/IAlertsRequestsRepository';

class AlertsCountTodayByProfileService {
  constructor(private alertsRequestsRepository: IAlertsRequestsRepository) {}

  public async execute(profile_id: number): Promise<number> {
    const date = format(new Date(), 'yyyy-MM-dd 23:59:59');

    const alerts = await this.alertsRequestsRepository.countTodayByProfile(
      profile_id,
      date,
    );

    return alerts;
  }
}

export default AlertsCountTodayByProfileService;
