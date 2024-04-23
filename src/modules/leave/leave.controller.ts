import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
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
      with following details:</p>
      <p>Reason: ${createLeaveDto.reason}</p>
      <p>Start Date: ${createLeaveDto.startDate}</p>
      <p>End Date: ${createLeaveDto.endDate}</p>
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

  @Patch(':empId/:leaveId')
  async markOut(
    @Param('empId') empId: number,
    @Param('leaveId') leaveId: number,
    @Body('leaveStatus') leaveStatus: string, 
  ) {
    const result = await this.leaveService.updateById(empId, leaveId, leaveStatus);

    // Send email notification if the update was successful
    await this.sendLeaveUpdateEmail(leaveId, empId);

    return result;
  }




// @Patch(':id')
// async updateById(
//   @Param('id', ParseIntPipe) leaveId: number,
//   @Body() payload: any
// ) {
//   const empId = payload.empId; // Extract empId from the payload
//   const result = await this.leaveService.updateById(leaveId, empId, payload); // Pass empId to the service method

//   // Send email notification if the update was successful
//   await this.sendLeaveUpdateEmail(leaveId, empId);

//   return result;
// }

private async sendLeaveUpdateEmail(leaveId: number, empId: number) {
  console.log('++++++++++===============================================' , leaveId , empId);
  
  const { leave, employee } = await this.leaveService.findById(leaveId, empId);
  const employeeEmail = leave.employeeEmail;
  const status = leave.leaveStatus;
  const { firstName, lastName } = employee;
  console.log('++++++++++' , employee);
  
  // Prepare email content
  const from = 'transmogrifyhrms@gmail.com';
  const to = employeeEmail;
  const subject = 'Leave Request Updated';
  const htmlBody = `<p>Hello ${firstName} ${lastName},</p>
                    <p>Your leave request has been ${status}. <br></p>
                    <p>For further details please check updated leave details on your HRMS.</p>
                    <p>Thank you for using Transmogrify HRMS.</p>`;

  // Send email
  await this.mailerService.sendEmail(from, to, subject, htmlBody, empId);
}

  
}
