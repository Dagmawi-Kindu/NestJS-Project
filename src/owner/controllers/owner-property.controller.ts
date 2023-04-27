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
import { diskStoragePropertyItems } from 'utils/multerOptions';

import { AddOwnerPropertyInterceptor } from '../interceptors/add-owner.interceptor';
import { PropertyFileFilter } from 'src/customer/filters/property-file.filter';

@Controller('owner-prop')
export class OwnerPropertyController {
  constructor(
    private ownerPropertyService: OwnerPropertyService, // @Inject(CACHE_MANAGER) private cacheManager: Cache, // @Inject(AgentAuthService) private agentAuthService: AgentAuthService,
  ) {}

  @Post('CreateProperty/:Owner_ID')
  @UseInterceptors(AddOwnerPropertyInterceptor)
  @UseFilters(PropertyFileFilter)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'building_front', maxCount: 1 },
        { name: 'building_side', maxCount: 1 },
        { name: 'reception_image_first', maxCount: 1 },
        { name: 'reception_image_second', maxCount: 1 },
      ],
      diskStoragePropertyItems,
    ),
  )
  @UsePipes(ValidationPipe)
  async CreateProperty(
    @UploadedFiles()
    files: {
      building_front?: Express.Multer.File[];
      building_side?: Express.Multer.File[];
      reception_image_first?: Express.Multer.File[];
      reception_image_second?: Express.Multer.File[];
    },
    @Param('Owner_ID', ParseUUIDPipe) ownerID: string,
    @Body() ownerPropertyDto: OwnerPropertyDto,
  ) {
    // console.log('Im in ');

    if (files.building_front) {
      files.building_front.forEach((element) => {
        ownerPropertyDto.buildingFront = element.filename;
      });
    }
    if (files.building_side) {
      files.building_side.forEach((element) => {
        ownerPropertyDto.buildingSide = element.filename;
      });
    }
    if (files.reception_image_first) {
      files.reception_image_first.forEach((element) => {
        ownerPropertyDto.receptionImage1 = element.filename;
      });
    }
    if (files.reception_image_second) {
      files.reception_image_second.forEach((element) => {
        ownerPropertyDto.receptionImage2 = element.filename;
      });
    }
    // console.log('OWNER', ownerPropertyDto);
    let checkEligibility = await this.ownerPropertyService.OwnerEligiblity(
      ownerID,
    );
    // console.log('HELLO', checkEligibility);
    return this.ownerPropertyService.addProperty(
      ownerPropertyDto,
      checkEligibility,
    );
  }

  @Post('testUpload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file1', maxCount: 1 },
        { name: 'file2', maxCount: 1 },
      ],
      diskStoragePropertyItems,
    ),
  )
  uploadMultipleFiles(
    @UploadedFiles()
    files: {
      file1?: Express.Multer.File[];
      file2?: Express.Multer.File[];
    },
  ) {
    files.file1.forEach((element) => {
      console.log(element.filename);
    });
  }
}
