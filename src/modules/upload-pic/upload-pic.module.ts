import { Module } from '@nestjs/common';
import { UploadPicController } from './upload-pic.controller';
import { UploadPicService } from './upload-pic.service';
import { Image } from './image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]), 
  ],
  providers: [UploadPicService],
  controllers: [UploadPicController]
})
export class UploadPicModule {}
