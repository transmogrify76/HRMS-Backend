import { Module } from '@nestjs/common';
import { EmployeedetailService } from './details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employeedetails } from './details.entity';
import { EmployeedetailsController } from './details.controller';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employeedetails]),
    EmployeeModule
  ],
  providers: [EmployeedetailService],
  controllers: [EmployeedetailsController]
})
export class EmployeedetailsModule { }