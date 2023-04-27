import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'customer_auth' })
export class CustomerAuth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  dob: Date;

  @Column()
  email: string;

  @Column({
    default: 'customer',
  })
  role: string;

  @Column()
  password: string;
}
