import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { EmployeedetailService } from './details.service';
import { Employeedetailsdto } from './dto/deatails.dto';


@Controller('employeedetails')
export class EmployeedetailsController {
  constructor(
    private readonly EmployeedetailService: EmployeedetailService
  ) {}

  @Post()
  async create(
    @Body(ValidationPipe) Employeedetailsdto: Employeedetailsdto
  ) {
    return await this.EmployeedetailService.create(Employeedetailsdto);
  }

  @Get()
  async findAll(
    @Query('empId') empId?: string
  ) {
    if (empId) {
      return await this.EmployeedetailService.findByEmpId(+empId);
    } else {
      return await this.EmployeedetailService.findAll();
    }
  }
}