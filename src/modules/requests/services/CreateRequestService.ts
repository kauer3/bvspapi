import Request from '../infra/typeorm/entities/Request';
import IRequestsRepository from '../repositories/IRequestsRepository';

interface IRequest {
  user_id: string;
  contact_type_id: number;
  description: string;
  contact: string;
}

class CreateRequestService {
  constructor(private requestsRepository: IRequestsRepository) {}

  public async execute(data: IRequest): Promise<Request> {
    const { user_id, contact_type_id, description, contact } = data;

    const request = await this.requestsRepository.create({
      user_id,
      request_status_id: 1, // 1 = status em aberto
      contact_type_id,
      contact,
      client_description: description,
    });

    return request;
  }
}

export default CreateRequestService;
