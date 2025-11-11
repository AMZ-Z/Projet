import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type AuthorId = string & { __brand: 'Author' };

@Entity('authors')
export class AuthorEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AuthorId;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;
}

import { Column as _Column } from 'typeorm'; // alias to avoid duplicate import tooling

// Photo URL (optional)
_Column({ name: 'photo_url', type: 'varchar', nullable: true })(AuthorEntity.prototype, 'photoUrl');
