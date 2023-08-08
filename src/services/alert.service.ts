import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { AlertTarget } from '../entities';

export class AlertService {
  private alertTargetRepository: Repository<AlertTarget>;

  constructor(dataSource: DataSource) {
    this.alertTargetRepository = dataSource.getRepository(AlertTarget);
  }

  async getAlertTargets(options: FindOptionsWhere<AlertTarget>) {
    const relations: FindOptionsRelations<AlertTarget> = { user: {} };
    return this.alertTargetRepository.find({ where: options, relations });
  }
}
