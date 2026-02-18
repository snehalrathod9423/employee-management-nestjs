import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DeleteDateColumn } from 'typeorm';

@Entity()
export class Employee {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  department: string;

  @Column()
  salary: number;

  @Column()
  password: string;

  @Column({ default: 'employee' })
  role: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
