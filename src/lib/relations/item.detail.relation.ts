import { FindOptionsRelations } from 'typeorm';
import { Item } from '../../entities';
import { ItemDetailEntity } from '../../entities/item/detall.entity';

const getItemDetailRelation = (
  inner: FindOptionsRelations<ItemDetailEntity>,
): FindOptionsRelations<Item> => ({
  macbook: { ...inner },
  ipad: { ...inner },
  iphone: { ...inner },
});

export { getItemDetailRelation };
