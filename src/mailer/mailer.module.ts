import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { EmployeeModule } from 'src/modules/employee/employee.module';
import { MailerController } from './mailer.controller';

@Module({
  imports: [EmployeeModule],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
