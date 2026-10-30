import { Injectable, NotFoundException } from '@nestjs/common';
import { handleError } from '../common/helpers';
import { CreateWatchParams } from './interfaces/create-watch-params.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Watch } from './entities/watch.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateWatchParams, WatchImage } from './interfaces';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class WatchesService {
  variables: {};
  constructor(
    @InjectRepository(Watch)
    private readonly watchRepository: Repository<Watch>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createWatchParams: CreateWatchParams) {
    try {
      const { createWatchDto, images, folder } = createWatchParams;

      let newImages: WatchImage[] = [];

      if (images && images.length) {
        newImages = await this.cloudinaryService.uploadImages(images, folder);
      }

      const newWatch = this.watchRepository.create({
        ...createWatchDto,
        images: newImages,
      });

      await this.watchRepository.save(newWatch);
      
      return {
        newWatch,
      };
    } catch (error) {
      console.log(error, this.variables);
      handleError(error);
    }
  }

  findAll() {
    try {
      return this.watchRepository.find();
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const watchExists = await this.watchRepository.findOne({ where: { id } });

      if (!watchExists)
        throw new NotFoundException(`watch with id: ${id} not found`);

      return watchExists;
    } catch (error) {
      handleError(error);
    }
  }

  async update(updateWatchParams: UpdateWatchParams) {
    try {
      const { id, updateWatchDto, images, folder } = updateWatchParams;

      const watch = await this.findOne(id);

      const { deletedImages, ...properties } = updateWatchDto;

      let currentImages: WatchImage[] = watch.images;

      if (deletedImages && deletedImages.length) {
        const publicIds = deletedImages.map((image) => image.publicId);

        currentImages = currentImages.filter((image) =>
          !publicIds.includes(image.publicId)
        );

        await this.cloudinaryService.deleteImage(publicIds);
      }

      let newImages: WatchImage[] = [];

      if (images && images.length) {
        newImages = await this.cloudinaryService.uploadImages(images, folder);
      }

      await this.watchRepository.update(id, {
        ...properties,
        images: [
          ...currentImages,
          ...newImages
        ]
      });

      return await this.findOne(id);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {

    try {
      await this.findOne(id);

      await this.watchRepository.update(id, {
        isAvailable: false
      });

      return this.findOne(id);
    } catch (error) {
      handleError(error);
    }

  }

}
