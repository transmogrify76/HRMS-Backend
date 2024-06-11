import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { EmployeeService } from '../employee/employee.service';
import { MailerService } from '../mailer/mailer.service';
import { Employee } from '../employee/employee.entity';
import { Leave } from './leave.entity';

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
      const to = 'tgwbin@gmail.com';
      // const to = 'transev76@gmail.com';
      const subject = `Leave Application Received from ${employee.employee.firstName}${employee.employee.lastName} !!!`;
      const htmlBody = `<p>Hello Sir,</p>
      <p>A leave application has been received from ${employee.employee.firstName}${employee.employee.lastName} <br>
      with following details:</p>
      <p>Reason: ${createLeaveDto.reason}</p>
      <p>Start Date: ${createLeaveDto.startDate}</p>
      <p>End Date: ${createLeaveDto.endDate}</p>
      <p>Employee mailID: ${employee.employee.email}</p>
      <p>Please take necessary action.</p>
      <p>Visit: <a href="https://transev.cloud">TransmogrifyHRMS-Portal</a></p> <br><br><br>
      <p>Thank you for using Transmogrify HRMS. Have a nice day!!</p><br>`;


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
    @Body('remark') leaveremark: string
  ) {
    const result = await this.leaveService.updateById(empId, leaveId, leaveStatus, leaveremark);

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
  
  const { leave, employee } = await this.leaveService.findById(leaveId, empId);
  const employeeEmail = leave.employeeEmail;
  const status = leave.leaveStatus;
  const { firstName, lastName } = employee;
  
  const from = 'transmogrifyhrms@gmail.com';
  const to = employeeEmail;
  const subject = 'Leave Request Updated';
  const htmlBody = `<p>Dear ${firstName}! <br> Greetings from Transmogrify.</p> <br>
                    <p>You have applied for the leave recently. Your leave request has been ${status}. <br></p>
                    <p>Remark from Admin (if any): ${leave.remark} </p>
                    <p>Please log in to your HRMS account to view the updated leave details. <a href="https://transev.cloud">TransmogrifyHRMS-Portal</a></p>
                    <p>If you have any questions or concerns, feel free to reach out to us.</p> <br><br>
                    <p>Thank you for using Transmogrify HRMS.</p>`;

  // Send email
  await this.mailerService.sendEmail(from, to, subject, htmlBody, empId);
}
@Get(':month')
  async getEmployeeDetailsByMonth(@Param('month') month: number): Promise<{ employee: Employee, leave: Leave[] }[]> {
    const employeeDetailsWithAttendances = await this.leaveService.getEmployeeDetailsByMonth(month);


    const result: { employee: Employee, leave: Leave[] }[] = [];
    const uniqueEmployeesMap = new Map<number, Employee>();
    employeeDetailsWithAttendances.forEach(({ employee, leave }) => {
      if (!uniqueEmployeesMap.has(employee.empId)) {
        uniqueEmployeesMap.set(employee.empId, employee);
        result.push({ employee, leave });
      }
    });

    return result;
  
  }
  
}
