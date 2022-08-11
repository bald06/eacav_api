import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, name: 'int_num' })
  intNum?: string;

  @Column({
    nullable: false,
    name: 'ext_num',
  })
  extNum: string;

  @Column({ nullable: true })
  suburb: string;

  @Column({ nullable: true })
  municipality: string;

  @Column({ nullable: true })
  state: string;

  @Column({ name: 'zip_code', nullable: true })
  zipCode: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Timestamp;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Timestamp;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Timestamp;
}
