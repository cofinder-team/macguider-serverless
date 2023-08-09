import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { ItemIpad } from './item/ipad.entity';
import { ItemMacbook } from './item/macbook.entity';

@Entity({ schema: 'macguider', name: 'model' })
export class Model {
  @Column()
  type: string;

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ItemMacbook, (macbookItem) => macbookItem.modelEntity)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'model' },
  ])
  macbookItems: ItemMacbook[];

  @OneToMany(() => ItemIpad, (ipadItem) => ipadItem.modelEntity)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'id', referencedColumnName: 'model' },
  ])
  ipadItems: ItemIpad[];
}
