import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../item.entity';

@Entity({ schema: 'macguider', name: 'log_coupang' })
export class CoupangLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  itemId: number;

  @Column()
  date: Date;

  @Column({ nullable: true })
  price?: number;

  @ManyToOne(() => Item, (item) => item.vendors)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'item_id', referencedColumnName: 'id' },
  ])
  item: Item;
}
