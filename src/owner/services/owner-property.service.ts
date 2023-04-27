import * as dotenv from 'dotenv';
dotenv.config();
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerAuth } from 'src/owner/entities/OwnerAuth.entity';
import { OwnerProperty } from 'src/owner/entities/OwnerProperty.entity';
import { OwnerPropertyType } from 'src/types/owner-property-type';

@Injectable()
export class OwnerPropertyService {
  constructor(
    @InjectRepository(OwnerProperty)
    private ownerPropertyRepository: Repository<OwnerProperty>,
    @InjectRepository(OwnerAuth)
    private ownerAuthRepository: Repository<OwnerAuth>,
  ) {}
  async OwnerEligiblity(ownerID: string) {
    const checkEligibility = await this.ownerAuthRepository.findOne({
      where: {
        id: ownerID,
      },
    });
    if (!checkEligibility) {
      throw new HttpException('Invalid ID!', HttpStatus.NOT_FOUND);
    } else return checkEligibility;
  }
  async addProperty(ownerPropertyType: OwnerPropertyType, owner: OwnerAuth) {
    // console.log('ownertProp: ', typeof ownerPropertyType);
    // console.log('owneeer', typeof owner);

    // const user = Object.assign(ownerPropertyType, owner);

    // console.log('IM THE USER:: ', user) ;

    const newProperty = this.ownerPropertyRepository.create({
      ...ownerPropertyType,
      owner: owner,
    });
    return this.ownerPropertyRepository.save(newProperty);
  }
}
