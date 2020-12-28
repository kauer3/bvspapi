import { lastDayOfYear } from 'date-fns';
import IRequestsRepository from '../repositories/IRequestsRepository';

interface IResponse {
  parameter: string;
  value: number;
}

class IndicatorsByYearService {
  constructor(private requestsRepository: IRequestsRepository) {}

  public async execute(year: number): Promise<IResponse[]> {
    const to = new Date(year, 0, 1);
    const from = lastDayOfYear(to);

    const requests = await this.requestsRepository.findByDateBetween(to, from);

    const january = requests.filter(
      request => request.created_at.getMonth() === 0,
    ).length;
    const february = requests.filter(
      request => request.created_at.getMonth() === 1,
    ).length;
    const march = requests.filter(
      request => request.created_at.getMonth() === 2,
    ).length;
    const april = requests.filter(
      request => request.created_at.getMonth() === 3,
    ).length;
    const may = requests.filter(request => request.created_at.getMonth() === 4)
      .length;
    const june = requests.filter(request => request.created_at.getMonth() === 5)
      .length;
    const july = requests.filter(request => request.created_at.getMonth() === 6)
      .length;
    const august = requests.filter(
      request => request.created_at.getMonth() === 7,
    ).length;
    const september = requests.filter(
      request => request.created_at.getMonth() === 8,
    ).length;
    const october = requests.filter(
      request => request.created_at.getMonth() === 9,
    ).length;
    const november = requests.filter(
      request => request.created_at.getMonth() === 10,
    ).length;
    const december = requests.filter(
      request => request.created_at.getMonth() === 11,
    ).length;

    const indicators = [
      { parameter: 'Jan', value: january },
      { parameter: 'Fev', value: february },
      { parameter: 'Mar', value: march },
      { parameter: 'Abr', value: april },
      { parameter: 'Mai', value: may },
      { parameter: 'Jun', value: june },
      { parameter: 'Jul', value: july },
      { parameter: 'Ago', value: august },
      { parameter: 'Set', value: september },
      { parameter: 'Out', value: october },
      { parameter: 'Nov', value: november },
      { parameter: 'Dez', value: december },
    ];

    return indicators;
  }
}

export default IndicatorsByYearService;
