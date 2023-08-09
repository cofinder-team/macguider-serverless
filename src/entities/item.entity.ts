import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Vendor } from './vendor.entity';
import { CoupangLog } from './log/coupang.entity';
import { Deal } from './deal.entity';
import { AlertTarget } from './alert/target.entity';
import { ItemMacbook } from './item/macbook.entity';
import { ItemIpad } from './item/ipad.entity';

@Entity({ schema: 'macguider', name: 'item' })
export class Item extends BaseEntity {
  @PrimaryColumn()
  type: string;

  @PrimaryColumn()
  id: number;

  @OneToOne(() => ItemMacbook, (itemMacbook) => itemMacbook.item)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'id' },
  ])
  macbook: ItemMacbook;

  @OneToOne(() => ItemIpad, (ItemIpad) => ItemIpad.item)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'id' },
  ])
  ipad: ItemIpad;

  @OneToMany(() => Vendor, (vendor) => vendor.item)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'item_id' },
  ])
  vendors: Vendor[];

  @OneToMany(() => CoupangLog, (coupangLog) => coupangLog.item)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'item_id' },
  ])
  coupangLogs: CoupangLog[];

  @OneToMany(() => Deal, (deal) => deal.item)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'item_id' },
  ])
  deals: Deal[];

  @OneToMany(() => AlertTarget, (alertTarget) => alertTarget.item)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'item_id' },
  ])
  alertTargets: AlertTarget[];
}
