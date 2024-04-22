import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { Payroll } from './payroll.entity'; 
import { PayrollDto } from './payroll.dto';


@Controller('payroll')
export class PayrollController {
  constructor(
    private readonly PayrollService: PayrollService
  ) {}

  @Post()
  async create(
    @Body(ValidationPipe) PayrollDto: PayrollDto
  ) {
    return await this.PayrollService.create(PayrollDto);
  }

  @Get()
  async findAll(
    @Query('empId') empId?: string
  ) {
    if (empId) {
      return await this.PayrollService.findByEmpId(+empId);
    } else {
      return await this.PayrollService.findAll();
    }
  }
}