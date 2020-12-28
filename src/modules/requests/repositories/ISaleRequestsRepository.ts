import ICreateSaleRequestDTO from '../dtos/ICreateSaleRequestDTO';
import SaleRequest from '../infra/typeorm/entities/SaleRequest';

export default interface ISaleRequestsRepository {
  create(sale: ICreateSaleRequestDTO): Promise<SaleRequest>;
  save(sale: SaleRequest): Promise<SaleRequest>;
  findByRequestId(id: string): Promise<SaleRequest | undefined>;
}
