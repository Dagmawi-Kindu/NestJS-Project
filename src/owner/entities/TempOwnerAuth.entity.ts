import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'temp_owner_auth' })
export class TempOwnerAuth {
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

  @Column({
    default: false,
  })
  isVerified: boolean;
}
