// upload-pic.controller.ts

import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadPicService } from './upload-pic.service';
import { Response } from 'express';
import { ApiConsumes, ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class UploadPicController {
    constructor(private readonly imageService: UploadPicService) {}

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'The file has been successfully uploaded.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.imageService.uploadImage(file);
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'The file has been successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'File not found.' })
    async getFile(@Param('id') id: number, @Res() res: Response) {
        try {
            const image = await this.imageService.getImageById(id);
            if (!image) {
                throw new HttpException('File not found', HttpStatus.NOT_FOUND);
            }
            res.setHeader('Content-Type', image.mimetype);
            res.send(image.data);
        } catch (err) {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND);
        }
    }
}
