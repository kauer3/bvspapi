import { Request, Response } from 'express';

import RequestRepository from '@modules/requests/infra/typeorm/repositories/RequestRepository';
import IndicatorsByMonthService from '@modules/requests/services/IndicatorsByMonthService';

export default class IndicatorsByMonthController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;

    const requestRepository = new RequestRepository();
    const indicatorsByMonthService = new IndicatorsByMonthService(
      requestRepository,
    );

    const indicators = await indicatorsByMonthService.execute(
      Number(month),
      Number(year),
    );

    return response.json(indicators);
  }
}
