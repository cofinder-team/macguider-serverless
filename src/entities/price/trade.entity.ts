import { BaseEntity, Column, ViewEntity } from 'typeorm';

@ViewEntity({ schema: 'macguider', name: 'price_trade' })
export class PriceTrade extends BaseEntity {
  @Column()
  type: string;

  @Column()
  id: number;

  @Column()
  unused: boolean;

  @Column()
  source: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  average: number;
}
