import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class UploadPicService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
    ) {}

    async uploadImage(file: Express.Multer.File): Promise<Image> {
        const { originalname, mimetype, buffer } = file;
        const image = new Image();
        image.filename = originalname;
        image.mimetype = mimetype;
        image.data = buffer;
        return await this.imageRepository.save(image);
    }

    async getImageById(id: number): Promise<Image> {
        return await this.imageRepository.findOne({ where: { id } });
    }
    
}
