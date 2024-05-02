import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { EmployeeService } from '../employee/employee.service';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Status } from 'src/enums/status.enum';
import { Employee } from '../employee/employee.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    private readonly employeeService: EmployeeService,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>, // Injecting Employee Repository
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    const { employee } = await this.employeeService.findById(+createAttendanceDto.employee);
    createAttendanceDto.employee = employee;
    createAttendanceDto['attStatus'] = Status.PENDING;

    const newAttendance = await this.attendanceRepository.save(createAttendanceDto);
    employee.attendances = [...employee.attendances, newAttendance];
    await employee.save();

    return {
      attId: newAttendance.attId,
      message: `A brand new check-in request is generated for ${employee.username} at ${newAttendance.checkIn} [${newAttendance.attStatus}]`
    };
  }

  async findAll() {
    const attendances = await this.attendanceRepository.find();

    return {
      attendances
    };
  }

  async findById(attId: number) {
    const attendance = await this.attendanceRepository.findOne({
      where: {
        attId
      },
      relations: ['employee']
    });

    if (!attendance) {
      throw new NotFoundException(`No attendance exists with attId ${attId}`);
    } else {
      return {
        attendance
      };
    }
  }

  async findByEmpId(empId: number) {
    const { employee } = await this.employeeService.findById(empId);
    const attendances = await this.attendanceRepository.find({
      where: {
        employee: {
          empId
        }
      }
    });

    if (!attendances.length) {
      throw new NotFoundException(`No attendance exists for employee ${employee.username} (${employee.firstName} ${employee.lastName})`);
    } else {
      return {
        attendances
      };
    }
  }

  async updateById(attId: number, updateAttendanceDto: UpdateAttendanceDto) {
    const { attendance } = await this.findById(attId);
    await this.attendanceRepository.update(attId, updateAttendanceDto);
    const updatedAttendance = await this.findById(attId);

    return {
      message: `Attendance request of ${attendance.employee.username} updated successfully [${updatedAttendance.attendance.attStatus}]`
    };
  }

  async getEmployeeDetailsByMonth(month: number): Promise<{ employee: Employee, attendances: Attendance[] }[]> {
    const startDate = new Date(`2024-${month.toString().padStart(2, '0')}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    // Fetching attendances within the specified month range
    const attendances = await this.attendanceRepository.find({
      where: {
        checkIn: Between(startDate, endDate),
      },
      relations: ['employee'], // Ensure related employees are loaded
    });

    // Grouping attendances by employee
    const attendanceMap = new Map<number, { employee: Employee, attendances: Attendance[] }>();
    attendances.forEach(attendance => {
      const empId = attendance.employee.empId;
      if (!attendanceMap.has(empId)) {
        attendanceMap.set(empId, { employee: attendance.employee, attendances: [] });
      }
      attendanceMap.get(empId).attendances.push(attendance);
    });

    // Extracting employee details and unique attendances
    const result: { employee: Employee, attendances: Attendance[] }[] = Array.from(attendanceMap.values());
    return result;
}
}
