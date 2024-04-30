import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post,Put, Query, ValidationPipe } from '@nestjs/common';
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

  @Put(':empId')
    async updatePayrollByEmployeeId(@Param('empId') empId: string, @Body() payrollDto: PayrollDto) {
        try {
            const result = await this.PayrollService.updateByEmployeeId(+empId, payrollDto);
            return result;
        } catch (error) {
              console.log(error)
         
        }
    }
}