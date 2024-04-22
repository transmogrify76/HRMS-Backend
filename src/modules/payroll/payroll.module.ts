import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './payroll.entity'; 
import { PayrollController } from './payroll.controller'; 
import { EmployeeModule } from '../employee/employee.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([Payroll]),
      EmployeeModule
    ],
    providers: [PayrollService],
    controllers: [PayrollController]
  })
export class PayrollModule { }
