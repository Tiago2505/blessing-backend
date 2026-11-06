import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { WatchesService } from './watches.service';
import { ImagesInterceptor } from '../common/interceptors';
import { CreateWatchParams, UpdateWatchParams } from './interfaces';
import { CreateWatchDto, UpdateWatchDto } from './dto';
import { Auth } from '../auth/decorators';
import { UserRoles } from '../users/enums';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Watches')
@Controller('watches')
export class WatchesController {
  constructor(private readonly watchesService: WatchesService) {}

  @Post()
  @Auth(UserRoles.ADMIN)
  @UseInterceptors(ImagesInterceptor())
  create(
    @Body() createWatchDto: CreateWatchDto,
    @UploadedFiles() images: Express.Multer.File[],
    @Query('folder') folder: string = 'Watches',
  ) {
    const params: CreateWatchParams = {
      createWatchDto,
      images,
      folder,
    };

    return this.watchesService.create(params);
  }

  @Get()
  findAll() {
    return this.watchesService.findAll();
  }

  @Get(':id')
  @Auth(UserRoles.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.watchesService.findOne(id);
  }

  @Patch(':id')
  @Auth(UserRoles.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWatchDto: UpdateWatchDto,
    @UploadedFiles() newImages: Express.Multer.File[],
    @Query('folder') folder: string,
  ) {
    const params: UpdateWatchParams = {
      id,
      updateWatchDto: updateWatchDto,
      images: newImages,
      folder,
    };

    return this.watchesService.update(params);
  }

  @Delete(':id')
  @Auth(UserRoles.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.watchesService.remove(id);
  }

  
}
