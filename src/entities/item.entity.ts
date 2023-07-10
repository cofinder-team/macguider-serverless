import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Vendor } from './vendor.entity';

@Entity({ schema: 'macguider', name: 'item' })
export class Item extends BaseEntity {
  @PrimaryColumn()
  type: string;

  @PrimaryColumn()
  id: number;

  @OneToMany(() => Vendor, (vendor) => vendor.item)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'item_id' },
  ])
  vendors: Vendor[];
}
