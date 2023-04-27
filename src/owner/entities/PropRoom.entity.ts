import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OwnerProperty } from './OwnerProperty.entity';

export enum RoomType {
  kingSize = 'King Size',
  singleSize = 'Single Size',
  doubleSize = 'Double Size',
  deluxeSize = 'Deluxe Size',
}
@Entity({ name: 'prop-room' })
export class PropertyRooms {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  main_image_i: string;

  @Column()
  main_image_ii: string;

  @Column()
  main_image_iii: string;

  @Column()
  bath_image_i: string;

  @Column()
  bath_image_ii: string;

  @Column()
  others_image_i: string;

  @Column()
  others_image_ii: string;

  @Column({
    type: 'enum',
    enum: RoomType,
  })
  type: string;

  @Column()
  price: number;

  @Column()
  discount: number;

  @Column()
  totalAmount: number;

  @ManyToOne(() => OwnerProperty, (ownerProperty) => ownerProperty.room)
  @JoinColumn({
    name: 'PropertyID',
  })
  property: OwnerProperty;
}
