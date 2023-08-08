import { DataSource, Repository } from 'typeorm';
import { Item } from '../entities/item.entity';

export class ItemService {
  private itemRepository: Repository<Item>;

  constructor(dataSource: DataSource) {
    this.itemRepository = dataSource.getRepository(Item);
  }

  private async getItemsWithVendor(): Promise<Item[]> {
    return this.itemRepository.find({
      relations: ['vendors'],
    });
  }

  async getTargetItems(): Promise<Item[]> {
    const items = await this.getItemsWithVendor();
    return items.filter((item) => item.vendors.length > 0);
  }
}
