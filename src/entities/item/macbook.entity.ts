import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ItemDetailEntity } from './detall.entity';
import { Item } from '../item.entity';
import { Model } from '../model.entity';

@Entity({ schema: 'macguider', name: 'item_macbook' })
export class ItemMacbook extends ItemDetailEntity {
  @Column()
  chip: string;

  @Column()
  cpu: number;

  @Column()
  gpu: number;

  @Column()
  ram: number;

  @Column()
  ssd: string;

  @ManyToOne(() => Model, (model) => model.macbookItems)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'model', referencedColumnName: 'id' },
  ])
  modelEntity: Model;

  @OneToOne(() => Item, (item) => item.macbook)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'id' },
  ])
  item: Item;
}
