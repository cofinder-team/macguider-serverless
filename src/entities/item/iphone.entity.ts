import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ItemDetailEntity } from './detall.entity';
import { Model } from '../model.entity';
import { Item } from '../item.entity';

@Entity({ schema: 'macguider', name: 'item_iphone' })
export class ItemIphone extends ItemDetailEntity {
  @Column()
  modelSuffix: string;

  @Column()
  phoneStorage: string;

  @ManyToOne(() => Model, (model) => model.iphoneItems)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'model', referencedColumnName: 'id' },
  ])
  modelEntity: Model;

  @OneToOne(() => Item, (item) => item.iphone)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'id' },
  ])
  item: Item;
}
