import { lastDayOfMonth, getDaysInMonth, da } from 'date-fns';
import { empty } from 'uuidv4';

import IRequestsRepository from '../repositories/IRequestsRepository';

interface IResponse {
  parameter: number;
  value: number;
}

class IndicatorsByMonthService {
  constructor(private requestsRepository: IRequestsRepository) {}

  public async execute(month: number, year: number): Promise<IResponse[]> {
    const to = new Date(year, month - 1, 1);
    const from = lastDayOfMonth(to);

    const requests = await this.requestsRepository.findByDateBetween(to, from);

    const days = Array.from(new Array(getDaysInMonth(to))).map(
      (_, index) => index + 1,
    );

    const indicators = days.map(day => {
      return {
        parameter: day,
        value: requests.filter(request => request.created_at.getDate() === day)
          .length,
      };
    });

    return indicators;
  }
}

export default IndicatorsByMonthService;
