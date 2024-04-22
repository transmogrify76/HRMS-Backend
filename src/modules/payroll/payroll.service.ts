import { PayrollDto } from "./payroll.dto";
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Payroll } from "./payroll.entity"; 
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeService } from '../employee/employee.service';




@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private readonly payrollRepository: Repository<Payroll>,
    private readonly employeeService: EmployeeService
  ) { }

  async create(payrollDto: PayrollDto) {
    // Find the employee by ID
    const { employee } = await this.employeeService.findById(+payrollDto.employee);

    // Check if employee is found
    if (!employee) {
        throw new Error("Employee not found");
    }

    // Update the PayrollDto with the retrieved employee object
    payrollDto.employee = employee;

    // Create a new payroll entry
    const newPayroll = await this.payrollRepository.create(payrollDto);

    // Save the new payroll entry to the database
    const savedPayroll = await this.payrollRepository.save(newPayroll);

    // Check if employee's payrolls array exists and initialize if necessary
    if (!employee.payrolls) {
        employee.payrolls = [];
    }

    // Push the new payroll entry to the employee's payrolls array
    employee.payrolls.push(savedPayroll);

    // Save the updated employee object
    await employee.save();

    return {
        message: `Employee payroll details uploaded for ${employee.username}`
    };
}


  async findByEmpId(empId: number) {
    const { employee } = await this.employeeService.findById(empId);
    const payroll = await this.payrollRepository.find({
      where: {
        employee: {
          empId
        }
      }
    });

    if (!payroll.length) {
      throw new NotFoundException(`no payroll found for employee ${employee.username} (${employee.firstName} ${employee.lastName})`);
    } else {
      return {
        payroll
      };
    }
  }
  async findAll() {
    const payroll = await this.payrollRepository.find();

    return {
      payroll
    };
  }
}