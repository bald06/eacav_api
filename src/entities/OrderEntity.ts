import { Address } from 'cluster';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from './AddressEntity';
import { UserEntity } from './UserEntity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  subtotal: number;

  @Column({ nullable: true })
  total_amount: number;

  @Column('int', { array: true })
  products: number[];

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'address_id' })
  addressId?: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt?: Timestamp;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt?: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at', nullable: false })
  deletedAt?: Timestamp;

  @OneToOne(() => UserEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user?: UserEntity;

  @OneToOne(() => AddressEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'address_id',
    referencedColumnName: 'id',
  })
  address?: Address;
}
