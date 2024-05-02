import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Employee } from '../employee/employee.entity';
import { Attendance } from './attendance.entity';

@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService
  ) { }

  @Post()
  async create(
    @Body(ValidationPipe) createAttendanceDto: CreateAttendanceDto
  ) {
    return await this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  async findAll(
    @Query('empId') empId?: string
  ) {
    if (empId) {
      return await this.attendanceService.findByEmpId(+empId);
    } else {
      return await this.attendanceService.findAll();
    }
  }
  @Get('employee/month/:month')
  async getEmployeeDetailsByMonth(@Param('month') month: number): Promise<{ employee: Employee, attendances: Attendance[] }[]> {
    const employeeDetailsWithAttendances = await this.attendanceService.getEmployeeDetailsByMonth(month);

    // Extracting employee details and unique attendances
    const result: { employee: Employee, attendances: Attendance[] }[] = [];
    const uniqueEmployeesMap = new Map<number, Employee>();
    employeeDetailsWithAttendances.forEach(({ employee, attendances }) => {
      if (!uniqueEmployeesMap.has(employee.empId)) {
        uniqueEmployeesMap.set(employee.empId, employee);
        result.push({ employee, attendances });
      }
    });

    return result;
  
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) attId: number,
    @Body(ValidationPipe) updateAttendanceDto: UpdateAttendanceDto
  ) {
    return await this.attendanceService.updateById(attId, updateAttendanceDto);
  }
}
