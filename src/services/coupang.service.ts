import { DataSource, Repository } from 'typeorm';
import { CoupangLog } from '../entities';
import { CoupangPriceDto } from '../dtos';

export class CoupangService {
  coupangLogRepository: Repository<CoupangLog>;

  constructor(dataSource: DataSource) {
    this.coupangLogRepository = dataSource.getRepository(CoupangLog);
  }

  saveCoupangPrices = async (coupangLogs: CoupangPriceDto[]): Promise<void> => {
    this.coupangLogRepository.insert(coupangLogs);
  };
}
