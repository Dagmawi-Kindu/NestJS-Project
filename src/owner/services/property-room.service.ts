import * as dotenv from 'dotenv';
dotenv.config();
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerProperty } from 'src/owner/entities/OwnerProperty.entity';
import { OwnerPropertyType } from 'src/types/owner-property-type';
import { PropertyRooms } from '../entities/PropRoom.entity';
import { PropertyRoomsType } from 'src/types/property-rooms.type';

@Injectable()
export class PropertyRoomService {
  constructor(
    @InjectRepository(OwnerProperty)
    private ownerPropertyRepository: Repository<OwnerProperty>,
    @InjectRepository(PropertyRooms)
    private propertyRoomsRepository: Repository<PropertyRooms>,
  ) {}
  async PropertyEligibility(propID: string) {
    const checkEligibility = await this.ownerPropertyRepository.findOne({
      where: {
        id: propID,
      },
    });
    if (!checkEligibility) {
      throw new HttpException('Invalid ID!', HttpStatus.NOT_FOUND);
    } else return checkEligibility;
  }
  async AddRooms(
    propertyRoomsType: PropertyRoomsType,
    property: OwnerProperty,
  ) {
    const newProperty = this.propertyRoomsRepository.create({
      ...propertyRoomsType,
      property: property,
    });
    return this.propertyRoomsRepository.save(newProperty);
  }
}
