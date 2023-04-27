import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OwnerAuth } from './OwnerAuth.entity';
import { PropertyRooms } from './PropRoom.entity';
export enum PropType {
  GuestHouse = 'Guest House',
  Hotel = 'Hotel',
}
@Entity({ name: 'owner_prop' })
export class OwnerProperty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  propName: string;

  @Column({ length: 500 })
  propDescription: string;

  @Column({
    type: 'enum',
    enum: PropType,
  })
  propType: string;

  @Column()
  totalNoOfRooms: number;

  @Column()
  singleSized: number;

  @Column()
  kingSized: number;

  @Column()
  doubleSized: number;

  @Column()
  deluxeSized: number;

  @Column()
  location: string;

  @Column()
  checkIn: string;

  @Column()
  checkOut: string;

  @Column()
  buildingFront: string;

  @Column()
  buildingSide: string;

  @Column()
  receptionImage1: string;

  @Column()
  receptionImage2: string;

  @ManyToOne(() => OwnerAuth, (ownerAuth) => ownerAuth.ownerProperty)
  @JoinColumn({
    name: 'OwnerID',
  })
  owner: OwnerAuth;

  @OneToMany(() => PropertyRooms, (room) => room.property)
  room: PropertyRooms[];
}
