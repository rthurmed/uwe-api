import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'bigint', default: new Date().getTime() })
  createdAt: number;
}
