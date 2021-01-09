import { Request, Response } from 'express';

export default class InfomobileappController {
  public async show(request: Request, response: Response): Promise<Response> {

    return response.json({
      moible_version: {
        manifest: '1.4.6',
        ios: '1.4.6',
        android: '17'
      }
    });
  }
}
