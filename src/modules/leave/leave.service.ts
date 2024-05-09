import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Leave } from './leave.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { EmployeeService } from '../employee/employee.service';
import { Status } from 'src/enums/status.enum';
import { Employee } from '../employee/employee.entity';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave)
    private readonly leaveRepository: Repository<Leave>,
    private readonly employeeService: EmployeeService
  ) { }

  async create(createLeaveDto: CreateLeaveDto) {
    const { employee } = await this.employeeService.findById(+createLeaveDto.empId);

     // Fetch employee's email and store it in CreateLeaveDto
    createLeaveDto.employeeEmail = employee.email;

    // createLeaveDto.empId = employee;
    createLeaveDto['leaveStatus'] = Status.PENDING;
    createLeaveDto['remark'] = null;

    const newLeave = await this.leaveRepository.save(createLeaveDto);
    employee.leaves = [...employee.leaves, newLeave];
    await employee.save();

    return {
      message: `a brand new leave request is generated for ${employee.username} (${newLeave.startDate} - ${newLeave.endDate}) for ${newLeave.duration}days[${newLeave.leaveStatus}]`
    };
  }

  async findAll() {
    const leaves = await this.leaveRepository.find();

    return {
      leaves
    };
  }

  async findById(leaveId: number , empId: number) {
    const { employee } = await this.employeeService.findById(empId);
    const leave = await this.leaveRepository.findOne({
      where: {
        leaveId
      },
      relations: ['employee']
    });

    if (!leave) {
      throw new NotFoundException(`no leave exists with leaveId ${leaveId}`);
    } else {
      return {
        employee,
        leave
      };
    }
  }

  async findByEmpId(empId: number) {
    const { employee } = await this.employeeService.findById(empId);
    const leaves = await this.leaveRepository.find({
      where: {
        employee: {
          empId
        }
      }
    });

    if (!leaves.length) {
      throw new NotFoundException(`no leave exists for employee ${employee.username} (${employee.firstName} ${employee.lastName})`);
    } else {
      const empId = employee.empId;
      return {
        leaves,
        empId
      };
    }
  }

  // async updateById(leaveId: number, empId: number, updateLeaveDto: UpdateLeaveDto) {
  //   const { leave, employee  } = await this.findById(leaveId, empId);
    
  //   console.log('[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[' , employee,empId);
    
  //   await this.leaveRepository.update(leaveId, updateLeaveDto);
  //   const updatedLeave = await this.findById(leaveId, empId);
  
  //   return {
  //     message: `leave request of ${leave.employee.username} updated successfully [${updatedLeave.leave.leaveStatus}]`
  //   };
  // }

  async updateById(empId:number,leaveId: number, leaveStatus:string, leaveremark:string) {
    const leave = await this.leaveRepository.findOne({
      where: { employee: { empId: empId }, leaveId: leaveId },
    });
    if (!leave) {
      throw new Error('Attendance record not found');
    }
    leave.leaveStatus = leaveStatus;
    leave.remark = leaveremark;
    return this.leaveRepository.save(leave);
  }
  
  async getEmployeeDetailsByMonth(month: number): Promise<{ employee: Employee, leave: Leave[] }[]> {
    const startDate = new Date(`2024-${month.toString().padStart(2, '0')}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const attendances = await this.leaveRepository.find({
      where: {
        startDate: Between(startDate, endDate),
      },
      relations: ['employee'], 
    });

    // Grouping attendances by employee
    const leavemap = new Map<number, { employee: Employee, leave: Leave[] }>();
    attendances.forEach(leave => {
      const empId = leave.employee.empId;
      if (!leavemap.has(empId)) {
        leavemap.set(empId, { employee: leave.employee, leave: [] });
      }
      leavemap.get(empId).leave.push(leave);
    });

    // Extracting employee details and unique attendances
    const result: { employee: Employee, leave: Leave[] }[] = Array.from(leavemap.values());
    return result;
}
  
}
