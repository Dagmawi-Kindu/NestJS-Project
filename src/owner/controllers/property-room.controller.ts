import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { OwnerPropertyDto } from 'src/owner/dtos/OwnerProperty.dto';
import { OwnerPropertyService } from 'src/owner/services/owner-property.service';
import { diskStorageRoomItems } from 'utils/multerOptions';

import { AddOwnerPropertyInterceptor } from '../interceptors/add-owner.interceptor';
import { PropertyRoomService } from '../services/property-room.service';
import { PropertyRoomsDto } from '../dtos/PropRooms.dto';
import { RoomsFileFilter } from 'src/customer/filters/rooms-file.filter';
import { AddRoomsInterceptor } from '../interceptors/add-rooms.interceptor';

@Controller('prop-room')
export class PropertyRoomsController {
  constructor(private propertyRoomService: PropertyRoomService) {}

  @Post('CreateRooms/:propID')
  @UseInterceptors(AddRoomsInterceptor)
  @UseFilters(RoomsFileFilter)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'main_image_i', maxCount: 1 },
        { name: 'main_image_ii', maxCount: 1 },
        { name: 'main_image_iii', maxCount: 1 },
        { name: 'bath_image_i', maxCount: 1 },
        { name: 'bath_image_ii', maxCount: 1 },
        { name: 'others_image_i', maxCount: 1 },
        { name: 'others_image_ii', maxCount: 1 },
      ],
      diskStorageRoomItems,
    ),
  )
  @UsePipes(ValidationPipe)
  async CreateProperty(
    @UploadedFiles()
    files: {
      main_image_i?: Express.Multer.File[];
      main_image_ii?: Express.Multer.File[];
      main_image_iii?: Express.Multer.File[];
      bath_image_i?: Express.Multer.File[];
      bath_image_ii?: Express.Multer.File[];
      others_image_i?: Express.Multer.File[];
      others_image_ii?: Express.Multer.File[];
    },
    @Param('propID', ParseUUIDPipe) propID: string,
    @Body() propertyRoomsDto: PropertyRoomsDto,
  ) {
    // console.log('Im in ');

    if (files.main_image_i) {
      files.main_image_i.forEach((element) => {
        propertyRoomsDto.main_image_i = element.filename;
      });
    }
    if (files.main_image_ii) {
      files.main_image_ii.forEach((element) => {
        propertyRoomsDto.main_image_ii = element.filename;
      });
    }
    if (files.main_image_iii) {
      files.main_image_iii.forEach((element) => {
        propertyRoomsDto.main_image_iii = element.filename;
      });
    }
    if (files.bath_image_i) {
      files.bath_image_i.forEach((element) => {
        propertyRoomsDto.bath_image_i = element.filename;
      });
    }
    if (files.bath_image_ii) {
      files.bath_image_ii.forEach((element) => {
        propertyRoomsDto.bath_image_ii = element.filename;
      });
    }
    if (files.others_image_i) {
      files.others_image_i.forEach((element) => {
        propertyRoomsDto.others_image_i = element.filename;
      });
    }
    if (files.others_image_ii) {
      files.others_image_ii.forEach((element) => {
        propertyRoomsDto.others_image_ii = element.filename;
      });
    }

    // console.log('OWNER', propertyRoomsDto);
    let checkEligibility = await this.propertyRoomService.PropertyEligibility(
      propID,
    );
    console.log('HELLO', checkEligibility);
    return this.propertyRoomService.AddRooms(
      propertyRoomsDto,
      checkEligibility,
    );
  }
}
