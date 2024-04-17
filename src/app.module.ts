import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { LeaveModule } from './modules/leave/leave.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { EmployeedetailsModule } from './modules/employeedetails/details.module';
import { MailerModule } from './mailer/mailer.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register({
      global: true,
      secret: 'supratim531',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '120m'
      }
    }),
    EmployeeModule,
    AttendanceModule,
    LeaveModule,
    PayrollModule,
    EmployeedetailsModule,
    MailerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
