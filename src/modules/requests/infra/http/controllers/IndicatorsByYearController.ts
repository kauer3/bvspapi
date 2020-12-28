import { Request, Response } from 'express';

import RequestRepository from '@modules/requests/infra/typeorm/repositories/RequestRepository';
import IndicatorsByYearService from '@modules/requests/services/IndicatorsByYearService';

export default class IndicatorsByYearController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year } = request.query;

    const requestRepository = new RequestRepository();
    const indicatorsByYearService = new IndicatorsByYearService(
      requestRepository,
    );

    const indicators = await indicatorsByYearService.execute(Number(year));

    return response.json(indicators);
  }
}
