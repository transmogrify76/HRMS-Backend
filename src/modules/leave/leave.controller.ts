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
    private readonly mailerService : MailerService
  ) { }

  @Post() 
  async create(
    @Body(ValidationPipe) createLeaveDto: CreateLeaveDto
  ) {
    
    const createdLeave =  await this.leaveService.create(createLeaveDto);
    
    // Admin ko email bhi to bhejnaaa haiiii 
    await this.sendLeaveApplication(createLeaveDto);
    return createdLeave;
  }

  private async sendLeaveApplication(createLeaveDto: CreateLeaveDto){
    const {empId} = createLeaveDto;

    try{
      const employee = await this.employeeService.findById(empId);
      // console.log('============================' , employee);
      
      const from = 'transmogrifyhrms@gmail.com';
      const to = 'transev76@gmail.com';
      const subject = 'Leave Application Received!!!';
      const htmlBody = `<p>Hello Sir,</p>
      <p>A leave application has been received from ${employee.employee.firstName}${employee.employee.lastName} <br>
      (Employee ID: ${createLeaveDto.empId}).</p>
      <p>Reason: ${createLeaveDto.reason}</p>
      <p>Employee mailID: ${employee.employee.email}</p>
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
  @Body() payload: any
) {
  const empId = payload.empId; // Extract empId from the payload
  const result = await this.leaveService.updateById(leaveId, empId, payload); // Pass empId to the service method

  // Send email notification if the update was successful
  await this.sendLeaveUpdateEmail(leaveId, empId);

  return result;
}


private async sendLeaveUpdateEmail(leaveId: number, empId: number) {
  // Prepare email content
  const from = 'transmogrifyhrms@gmail.com';
  const to = 'transev76@gmail.com';
  const subject = 'Leave Request Updated';
  const htmlBody = `<p>Hello Admin,</p>
                    <p>The leave request (ID: ${leaveId}) has been updated.</p>
                    <p>Please review the updated leave details.</p>`;

  // Send email
  await this.mailerService.sendEmail(from, to, subject, htmlBody, empId);
}

  
}
