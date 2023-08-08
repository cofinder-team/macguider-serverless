import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlertTarget } from './alert/target.entity';

@Entity({ schema: 'macguider', name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(() => AlertTarget, (alertTarget) => alertTarget.user)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  alertTargets: AlertTarget[];
}
