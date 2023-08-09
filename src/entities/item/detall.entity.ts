import { BaseEntity, Column, PrimaryColumn } from 'typeorm';
import { Item } from '../item.entity';
import { Model } from '../model.entity';

export class ItemDetailEntity extends BaseEntity {
  @Column()
  type: string;

  @PrimaryColumn()
  id: number;

  @Column()
  model: number;

  @Column()
  option: number;

  modelEntity: Model;

  item: Item;
}
