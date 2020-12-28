import { format, addDays } from 'date-fns';
import IAlertsRequestsRepository from '../repositories/IAlertsRequestsRepository';

import ICreateAlertRequestDTO from '../dtos/ICreateAlertRequestDTO';
import AlertRequesta from '../infra/typeorm/entities/AlertRequest';

class CreateAlertRequestService {
  constructor(private alertsRequestsRepository: IAlertsRequestsRepository) {}

  public async execute(data: ICreateAlertRequestDTO): Promise<AlertRequesta> {
    const { user_id, request_id, moment } = data;

    console.log('REQUISIÇÃO ENVIADA PARA O ALERTA', request_id);

    const alertExists = await this.alertsRequestsRepository.findByRequestId(
      request_id,
    );

    const formattedMoment =
      moment || format(addDays(new Date(), 3), 'yyyy-MM-dd');

    if (alertExists) {
      alertExists.moment = formattedMoment;
      await this.alertsRequestsRepository.save(alertExists);
      return alertExists;
    }

    const alert = await this.alertsRequestsRepository.create({
      request_id,
      user_id,
      moment: formattedMoment,
    });

    return alert;
  }
}

export default CreateAlertRequestService;
