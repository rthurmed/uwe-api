import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  creation: Date
}