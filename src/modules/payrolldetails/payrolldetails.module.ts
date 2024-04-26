import { Module } from '@nestjs/common';
import { PayrolldetailsdetailService } from './payrolldetails.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payrolldetails } from './payrolldetails.entity'; 
import { PayrolldetailsController } from './payrolldetails.controller'; 
import { EmployeeModule } from '../employee/employee.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([Payrolldetails]),
      EmployeeModule
    ],
    providers: [PayrolldetailsdetailService],
    controllers: [PayrolldetailsController]
  })
export class PayrolldetailsModule {}