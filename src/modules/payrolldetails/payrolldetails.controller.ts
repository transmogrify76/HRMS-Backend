import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { PayrolldetailsdetailService } from './payrolldetails.service';
import { PayrolldetailsDto } from './payrolldetails.dto';


@Controller('payrolldetails')
export class PayrolldetailsController {
  constructor(
    private readonly PayrolldetailsdetailService: PayrolldetailsdetailService
  ) {}

  @Post()
  async create(
    @Body(ValidationPipe) PayrolldetailsDto: PayrolldetailsDto
  ) {
    return await this.PayrolldetailsdetailService.create(PayrolldetailsDto);
  }

  @Get()
  async findAll(
    @Query('empId') empId?: string
  ) {
    if (empId) {
      return await this.PayrolldetailsdetailService.findByEmpId(+empId);
    } else {
      return await this.PayrolldetailsdetailService.findAll();
    }
  }
}