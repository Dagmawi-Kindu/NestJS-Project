import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OwnerProperty } from './OwnerProperty.entity';
@Entity({ name: 'owner_auth' })
export class OwnerAuth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  phoneNumber: string;

  @Column()
  dob: Date;

  @Column()
  email: string;

  @Column()
  tradeLiscence: string;

  @Column({
    default: 'owner',
  })
  role: string;

  @Column()
  password: string;

  @OneToMany(() => OwnerProperty, (ownerProperty) => ownerProperty.owner)
  ownerProperty: OwnerProperty[];
}
