import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  IsNull,
  Repository,
} from 'typeorm';
import { Deal } from '../entities';

export class DealService {
  private dealRepository: Repository<Deal>;

  constructor(dataSource: DataSource) {
    this.dealRepository = dataSource.getRepository(Deal);
  }

  async getTargetDeals() {
    const where: FindOptionsWhere<Deal> = { alertedAt: IsNull() };
    const relations: FindOptionsRelations<Deal> = { item: {} };
    return this.dealRepository.find({ where, relations });
  }
}
