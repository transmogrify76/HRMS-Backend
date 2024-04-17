import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leave } from './leave.entity';
import { LeaveController } from './leave.controller';
import { EmployeeModule } from '../employee/employee.module';
import { MailerService } from '../mailer/mailer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Leave]),
    EmployeeModule,
  ],
  providers: [LeaveService , MailerService],
  controllers: [LeaveController]
})
export class LeaveModule { }
