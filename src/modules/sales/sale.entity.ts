import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientEntity } from '../clients/client.entity';
import { BookEntity } from '../books/entities/book.entity';

@Entity('sales')
export class SaleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'client_id', type: 'uuid' })
  clientId: string;

  @Column({ name: 'book_id', type: 'uuid' })
  bookId: string;

  @Column({ name: 'purchased_at', type: 'datetime' })
  purchasedAt: Date;

  @ManyToOne(() => ClientEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;
}
