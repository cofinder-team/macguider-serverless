import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  IsNull,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Deal } from '../entities';
import { getItemDetailRelation } from '../lib/relations/item.detail.relation';

export class DealService {
  private dealRepository: Repository<Deal>;

  constructor(dataSource: DataSource) {
    this.dealRepository = dataSource.getRepository(Deal);
  }

  async getTargetDeals() {
    const where: FindOptionsWhere<Deal> = { alertedAt: IsNull() };
    const relations: FindOptionsRelations<Deal> = {
      item: getItemDetailRelation({ modelEntity: {} }),
    };
    return this.dealRepository.find({ where, relations });
  }

  async setAlerted(id: number): Promise<UpdateResult> {
    return this.dealRepository.update(id, { alertedAt: new Date() });
  }
}
