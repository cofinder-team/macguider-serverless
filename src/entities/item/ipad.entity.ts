import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ItemDetailEntity } from './detall.entity';
import { Item } from '../item.entity';
import { Model } from '../model.entity';

@Entity({ schema: 'macguider', name: 'item_ipad' })
export class ItemIpad extends ItemDetailEntity {
  @Column()
  gen: number;

  @Column()
  storage: number;

  @Column()
  cellular: boolean;

  @Column()
  chip: string;

  @ManyToOne(() => Model, (model) => model.ipadItems)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'model', referencedColumnName: 'id' },
  ])
  modelEntity: Model;

  @OneToOne(() => Item, (item) => item.ipad)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'id' },
  ])
  item: Item;
}
