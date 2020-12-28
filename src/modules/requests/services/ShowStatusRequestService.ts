import IFollowUpRequestsRepository from '../repositories/IFollowUpRequestsRepository';

class ShowStatusRequestService {
  constructor(
    private followUpRequestsRepository: IFollowUpRequestsRepository,
  ) {}

  public async execute(request_id: string): Promise<string> {
    const followups = await this.followUpRequestsRepository.listByRequestId(
      request_id,
    );

    if (followups.length === 0) return 'EM ABERTO';

    const processing = followups.filter(
      follow => follow.request_status_id === 2,
    );

    if (processing.length > 0) return 'EM ANDAMENTO';

    return 'CONCLUÍDO';
  }
}

export default ShowStatusRequestService;
