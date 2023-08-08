import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  IsNull,
  Repository,
} from 'typeorm';
import { PriceTrade } from '../entities';

export class PriceService {
  private priceTradeRepository: Repository<PriceTrade>;

  constructor(dataSource: DataSource) {
    this.priceTradeRepository = dataSource.getRepository(PriceTrade);
  }

  async getRecentTradePrice(
    options: FindOptionsWhere<PriceTrade>,
  ): Promise<PriceTrade | null> {
    const where: FindOptionsWhere<PriceTrade> = {
      source: IsNull(),
      ...options,
    };
    const order: FindOptionsOrder<PriceTrade> = { date: 'DESC' };

    return this.priceTradeRepository.findOne({ where, order });
  }
}
