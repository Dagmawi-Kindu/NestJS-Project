import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'temp_agent_auth' })
export class TempAgentAuth {
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
  kebeleID: string;

  @Column({
    default: 'agent',
  })
  role: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  isVerified: boolean;
}
