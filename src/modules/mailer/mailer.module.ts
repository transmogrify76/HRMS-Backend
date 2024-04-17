import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { EmployeeModule } from 'src/modules/employee/employee.module';

@Module({
  imports: [EmployeeModule],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
