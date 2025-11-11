import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email?: string;

  @Column({ name: 'photo_url', type: 'varchar', nullable: true })
  photoUrl?: string;
}
