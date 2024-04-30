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
    if (!employee) {
        throw new Error("Employee not found");
    }
    payrollDto.employee = employee;
    const newPayroll = await this.payrollRepository.create(payrollDto);
    const savedPayroll = await this.payrollRepository.save(newPayroll);

    if (!employee.payrolls) {
        employee.payrolls = [];
    }

    employee.payrolls.push(savedPayroll);
    await employee.save();

    return {
        message: `Employee payroll details uploaded for ${employee.username}`
    };
}

async updateByEmployeeId(empId: number, payrollDto: Partial<PayrollDto>) {

  const {employee} = await this.employeeService.findById(empId);

  if (!employee) {
      throw new Error("Employee not found");
  }

  let payroll = await this.payrollRepository.findOne({
    where: {
      employee: {
        empId
      }
    }
  });

  console.log(payroll)
  if (!payroll) {
      throw new Error("Payroll entry not found for this employee");
  }

  if (payrollDto.basicSalary !== undefined) {
      payroll.basicSalary = payrollDto.basicSalary;
  }
  if (payrollDto.HRA !== undefined) {
      payroll.HRA = payrollDto.HRA;
  }
  if (payrollDto.CityAllowance !== undefined) {
      payroll.CityAllowance = payrollDto.CityAllowance;
  }
  if (payrollDto.Con_Allowance !== undefined) {
      payroll.Con_Allowance = payrollDto.Con_Allowance;
  }
  if (payrollDto.Other !== undefined) {
      payroll.Other = payrollDto.Other;
  }
  if (payrollDto.Total_Earnings !== undefined) {
      payroll.Total_Earnings = payrollDto.Total_Earnings;
  }  
  if (payrollDto.Provident_Fund !== undefined) {
    payroll.Provident_Fund = payrollDto.Provident_Fund;
  }
  if (payrollDto.Professional_Tax !== undefined) {
    payroll.Professional_Tax = payrollDto.Professional_Tax;
  }
  if (payrollDto.ESI_Mediclaim !== undefined) {
    payroll.ESI_Mediclaim = payrollDto.ESI_Mediclaim;
  }

  payroll = await this.payrollRepository.save(payroll);

  return {
      message: `Payroll details updated for employee with ID ${employee.username}`
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