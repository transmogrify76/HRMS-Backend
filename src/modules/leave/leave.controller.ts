import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { EmployeeService } from '../employee/employee.service';
import { MailerService } from '../mailer/mailer.service';

@Controller('leave')
export class LeaveController {
  constructor(
    private readonly leaveService: LeaveService , 
    private readonly employeeService : EmployeeService , 
    private mailerService : MailerService
  ) { }

  @Post() 
  async create(
    @Body(ValidationPipe) createLeaveDto: CreateLeaveDto
  ) {
    const createdLeave =  await this.leaveService.create(createLeaveDto);

    // Admin ko email bhi to bhejnaaa haiiii 
    await this.sendLeaveApplication(createdLeave);
    return createdLeave;
  }

  private async sendLeaveApplication(leave : any){
    const {empId, reason} = leave;

    try{
      const employee = await this.employeeService.findById(empId);

      const from = 'transmogrifyhrms@gmail.com';
      const to = 'transev76@gmail.com';
      const subject = 'Leave Application Received!!!';
      const htmlBody = `<p>Hello Admin,</p>
      <p>A leave application has been received from ${employee.employee.firstName} ${employee.employee.lastName} <br>
      (Employee ID: ${employee.employee.empId}).</p>
      <p>Reason: ${leave.reason}</p>
      <p>Please take necessary action.</p>`;


      //mail bhejoooooo
      await this.mailerService.sendEmail(from , to , subject, htmlBody , empId);
    } catch (error) {
      console.error(error);
    }
  }



  @Get()
  async findAll(
    @Query('empId') empId?: string
  ) {
    if (empId) {
      return await this.leaveService.findByEmpId(+empId);
    } else {
      return await this.leaveService.findAll();
    }
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) leaveId: number,
    @Body(ValidationPipe) updateLeaveDto: UpdateLeaveDto
  ) {
    return await this.leaveService.updateById(leaveId, updateLeaveDto);
  }
}
