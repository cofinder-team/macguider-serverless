import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user.entity';
import { Item } from '../item.entity';

@Entity({ schema: 'macguider', name: 'alert_target' })
export class AlertTarget extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  itemId: number;

  @Column()
  unused: boolean;

  @Column()
  userId: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @ManyToOne(() => Item, (item) => item.alertTargets)
  @JoinColumn([
    { name: 'type', referencedColumnName: 'type' },
    { name: 'item_id', referencedColumnName: 'id' },
  ])
  item: Item;

  @ManyToOne(() => User, (user) => user.alertTargets)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
