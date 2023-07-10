import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Item } from './item.entity';

@Entity({ schema: 'macguider', name: 'vendor' })
export class Vendor extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  itemId: number;

  @Column()
  product: number;

  @Column()
  vendor: number;

  @ManyToOne(() => Item, (item) => item.vendors)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'item_id', referencedColumnName: 'id' },
  ])
  item: Item;
}
